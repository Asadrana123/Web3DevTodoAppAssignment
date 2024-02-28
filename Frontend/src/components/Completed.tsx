import CompletedTask from "./CompletedTask";
import { TodoState } from "../context/TodoProvider.tsx";

function Completed(): JSX.Element {
  const { tasks } = TodoState();

  return (
    <div>
      {tasks && tasks.length !== 0 ? (
        tasks.map((task, index) => (
          task.completed && <CompletedTask key={index} task={task}  />
        ))
      ) : (
        <h1>No Task Found</h1>
      )}
    </div>
  );
}

export default Completed;
