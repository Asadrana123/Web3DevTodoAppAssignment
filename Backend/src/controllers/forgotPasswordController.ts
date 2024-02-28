import UserModel from "../model/userModel";
import { createTransport } from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const forgotPassword = async (req: any, res: any) => {
    const { email }: { email: string } = req.body;
    const user: any = await UserModel.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const resetToken: string = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    await user.save();
    const resetUrl: string = `http://localhost:5173/resetPassword/${resetToken}`;
    const transporter: any = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    const mailOptions: any = {
        from: 'asadlukman246@gmail.com',
        to: email,
        subject: "Reset Password",
        html: `<h1>Reset Password</h1><h2>Click on the link to reset your password</h2><h3>${resetUrl}</h3>`
    };
    await transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({ message: 'A link to reset your password have been sent to your email.' });
};

const resetPassword = async (req: any, res: any) => {
    const { token, password }: { token: string, password: string } = req.body;
    console.log("token: ", token);
    const user: any = await UserModel.findOne({ resetToken: token });
    if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
    }
    const salt: string = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null;
    await user.save();
    res.status(200).json({ message: 'Password reset successful' });
};

export { forgotPassword, resetPassword };

