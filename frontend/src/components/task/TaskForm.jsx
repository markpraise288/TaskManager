import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useTasks } from "../../hooks/useTask";
import { useState } from "react";
import { createTask } from "../../services/taskService";
import { useAuth } from "../../hooks/useAuth";

export const TaskForm = () => {
  const { dispatch } = useTasks();
  const { getAccessToken, refreshAccessToken } = useAuth();
  const [taskName, setTaskName] = useState("");

  const saveTasks = async() => {
    if (!taskName.trim()) return;

    const createTaskRequest = async (taskName, getAccessToken, refreshAccessToken) => {
      try {
        const data = await createTask(taskName, getAccessToken, refreshAccessToken);

        return {
          _id: data.task._id,
          task: data.task.task,
          completed: data.task.completed,
        };
      } catch (error) {
        console.log(error);
      }
    };

    const newTask = await createTaskRequest(taskName,getAccessToken, refreshAccessToken);

    if (newTask) {
      dispatch({
        type: "ADD_TASK",
        payload: newTask,
      });
    }

    setTaskName("");
  };

  return (
    <div className="flex justify-between rounded items-center bg-gray-50 border-2 border-gray-300">
      <Input
        className={
          "bg-gray-50 outline-0 border-gray-300 w-10/12 p-3 rounded text-[1.1rem]"
        }
        type={"text"}
        value={taskName}
        placeholder={"Enter task...."}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button
        className={"bg-blue-600 px-4 py-3.5 text-white rounded-r"}
        variant={"primary"}
        onClick={saveTasks}
      >
        Save
      </Button>
    </div>
  );
};
