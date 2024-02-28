import { Request, Response } from 'express';
import TaskModel from '../model/taskModel';
import UserModel from '../model/userModel';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
declare global {
    namespace Express {
      interface Request {
        user?: { [key: string]: any };
      }
    }
  }
dotenv.config();
const sendMail = (email: string, subject: string, title: string, description: string) => {
  var transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME!,
      pass: process.env.GMAIL_PASSWORD!,
    },
  });

  var mailOptions = {
    from: 'alok.yadav6000@gmail.com',
    to: email,
    subject: subject,
    html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;
    const user = await UserModel.find({ _id: userId });

    const newTask = new TaskModel({ title, description, completed: false, userId });
    await newTask.save();

    sendMail(user[0].email, 'Task Added', title, description);
    res.status(200).json({ task: newTask, message: 'Task added successfully' });
  } catch (error:any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const removeTask = (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id: ', id);
  TaskModel
    .findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: 'Task deleted successfully' }))
    .catch((error:any) => res.status(501).json({ message: error.message }));
};

const getTask = (req: Request, res: Response) => {
  TaskModel
    .find({ userId: req.user?.id })
    .then((data:any) => res.status(200).json(data))
    .catch((error:any) => res.status(501).json({ message: error.message }));
};

export { addTask, getTask, removeTask };
