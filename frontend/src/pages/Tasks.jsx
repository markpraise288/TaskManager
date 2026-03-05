import { TaskForm } from "../components/task/TaskForm";
import { TasksList } from "../components/task/TasksList";

export const Tasks = () => {

  return (
    <>
      <TaskForm />
      <h2 className="my-5">My Tasks</h2>
      <TasksList />
    </>
  );
};
