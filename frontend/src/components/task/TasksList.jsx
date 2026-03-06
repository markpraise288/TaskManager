import { useTasks } from "../../hooks/useTask";
import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { updateTask } from "../../services/taskService";
import { useAuth } from "../../hooks/useAuth";

export const TasksList = () => {
  const { tasks, dispatch, setTasks } = useTasks();
  const [ isEditing, setIsEditing] = useState(false);
  const [ isLoading, setIsLoding ] = useState(true);
  const [ error, setError ] = useState("");
  const [ currentTask, setCurrentTask] = useState({});
  const { refreshAccessToken, getAccessToken } = useAuth();

  const fetchTasks = async () => {
    try{
      await setTasks();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoding(false);
    }
  }

  useEffect(()=>{
    setTimeout(() => {
      fetchTasks();
  },500)
  },[])

  const openEdit = (task, _id) => {
    setCurrentTask({ task, _id });
    setIsEditing(true);
  };

  const saveEdit = async () => {
    try {
      const data = await updateTask(currentTask._id, {
        task: currentTask.task,
      },getAccessToken, refreshAccessToken);
      dispatch({ type: "EDIT_TASK", payload: currentTask });
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ul className="flex flex-col gap-2">
    {isLoading && <p className='opacity-80'>Loading.....</p>}
    {error === "Please provide token" ? (
      <p className='text-red-500'>Refresh the page or login</p>
      ) : (
      error && <p className='text-red-500'>{error}</p>
      )}
    {tasks.length !== 0 && (
        tasks.map((task) => (
          <TaskCard
            openEdit={openEdit}
            key={task._id}
            id={task._id}
            task={task.task}
            completed={task.completed}
          />
        )))
      }
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl ">
            <Input
              value={currentTask.task}
              className={"border-2 border-gray-400 rounded p-1"}
              onChange={(e) =>
                setCurrentTask((prev) => ({ ...prev, task: e.target.value }))
              }
            />
            <Button
              onClick={saveEdit}
              className={"bg-blue-600 text-gray-50 py-0.5 px-2 mx-2 rounded"}
            >
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              className={"bg-red-600 text-gray-50 py-0.5 px-2 rounded"}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </ul>
  );
};
