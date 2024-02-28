import React from 'react';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import "./task.css";
import { TodoState } from '../../context/TodoProvider.tsx';
import axios from 'axios';
interface TaskProps {
  task: {
    _id:number,
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: string;
  };
  id: number;
}

function Task({ task, id }: TaskProps): JSX.Element {
  const { tasks, setTasks,userToken } = TodoState();
  console.log(tasks);
  const handleRemove = async(e: React.MouseEvent) => {
    e.preventDefault();
    setTasks(tasks.filter((task) => task._id !== id));
    try{
          const res= await axios.delete(`http://localhost:8001/api/task/removeTask/${id}`,{
                headers:{
                    Authorization:`Bearer ${userToken}`
                }
           })
           console.log(res);
    }catch(error){
        console.log(error);
    }
  };

  const handleMarkDone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTasks(tasks.map((taskItem) => {
      if (id === taskItem._id) {
        taskItem.completed = !taskItem.completed;
      }
      return taskItem;
    }));
  };

  return (
    <div className='bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3'>
      <div className="mark-done">
        <input type="checkbox" className="checkbox" onChange={handleMarkDone} checked={task.completed} />
      </div>
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.title}</h4>
        <p className="task-description">{task.description}</p>
        <div className='italic opacity-60'>
          {
            task?.createdAt ? (
              <p>{moment(task.createdAt).fromNow()}</p>
            ) : (
              <p>just now</p>
            )
          }
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          onClick={handleRemove}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
