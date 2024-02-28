import Task from './Task/Task';
import { TodoState } from '../context/TodoProvider.tsx';

function Active(): JSX.Element {
  const { tasks } = TodoState();

  return (
    <div>
      {tasks.length !== 0 ? (
        tasks.map((task, index) => {
          return !task.completed && <Task key={index} task={task} id={index} />;
        })
      ) : (
        <h1>No Task Found</h1>
      )}
    </div>
  );
}

export default Active;
