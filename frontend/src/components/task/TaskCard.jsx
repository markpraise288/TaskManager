import { Button } from "../ui/Button";
import { useTasks } from "../../hooks/useTask";
import { Input } from "../ui/Input";
import { deleteTask, updateTask } from "../../services/taskService";
import { useAuth } from "../../hooks/useAuth";

export const TaskCard = ({ id, task, completed, openEdit }) => {
  const { dispatch } = useTasks();
  const { getAccessToken, refreshAccessToken } = useAuth();

  const deleteTaskRequest = async() => {
    try{

      const data = await deleteTask(id, getAccessToken, refreshAccessToken);
      dispatch({ type: "DELETE_TASK", payload: id });

    } catch (error) {
      throw error;
    }
  };

  const completeHandler = async () => {
    const updateCompleted = async () => {
      try {
        const data = await updateTask(id, { completed: !completed }, getAccessToken, refreshAccessToken);
        dispatch({ type: "TOGGLE_TASK", payload: id });
      } catch (error) {
        throw error;
      } 
    };
    updateCompleted();
    
  };
  return (
    <li className="flex justify-between items-center gap-4 p-3 border-2 border-gray-300 bg-gray-50 rounded-2xl">
      <Input
        className={"scale-140"}
        onChange={() => completeHandler()}
        checked={completed}
        type={"checkbox"}
      />
      <p
        className={completed ? "mr-auto line-through text-gray-400" : "mr-auto"}
      >
        {task}
      </p>
      <Button
        className={"bg-amber-500 py-1 px-2 rounded text-cyan-950"}
        onClick={() => openEdit(task, id)}
      >
        Edit
      </Button>
      <Button
        className={"bg-red-600 px-2 py-1 text-white rounded"}
        variant={"danger"}
        onClick={()=> deleteTaskRequest()}
      >
        Delete
      </Button>
    </li>
  );
};
