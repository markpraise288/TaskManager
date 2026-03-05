import { createContext, useEffect, useReducer } from "react";
import { taskReducer } from "../reducers/taskReducer";
import { getTasks } from "../services/taskService";
import { useAuth } from "../hooks/useAuth";

export const TaskContext = createContext();

const initialState = {
  tasks: [],
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const { refreshAccessToken, getAccessToken } = useAuth();

  const setTasks = async () => {
    try {
      const data = await getTasks(getAccessToken, refreshAccessToken);
      if (data) {
        dispatch({ type: "LOAD_TASKS", payload: data });
      }
    } catch (error) {
      throw error;
    } 
  };

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
