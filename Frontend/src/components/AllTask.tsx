import Task from './Task/Task';
import { TodoState } from '../context/TodoProvider.tsx';

function AllTask(): JSX.Element {
  const { tasks } = TodoState();

  return (
    <div>
      {tasks && tasks.length !== 0 ? (
        tasks.map((task, index) => (
          <Task key={index} task={task} id={task._id} />
        ))
      ) : (
        <h1>No Task Found</h1>
      )}
    </div>
  );
}

export default AllTask;