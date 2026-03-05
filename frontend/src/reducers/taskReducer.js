export const taskReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_TASKS":
            return { ...state, tasks: action.payload };
        case "ADD_TASK":
            return { ...state, tasks: [...state.tasks, action.payload] };
        case "DELETE_TASK":
            return { ...state, tasks: state.tasks.filter(task => task._id !== action.payload) };
        case "TOGGLE_TASK":
            return { ...state, tasks: state.tasks.map(task =>
                task._id === action.payload ? { ...task, completed: !task.completed }
                : task
            )}
        case "EDIT_TASK":
            return {...state, tasks: state.tasks.map(task => (
                task._id === action.payload._id ? { ...task, task: action.payload.task }
                : task
            ))}
        default:
            return state;
    }
}   
