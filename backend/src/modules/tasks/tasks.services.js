const Task = require('../../models/tasks.model');

const getTasks = async (userId)=> {
    const tasks = await Task.find({ user: userId});

    if(!tasks) {
        const error = new Error("No tasks yet...");
        error.statusCode = 404;
        throw error;
    }

    return tasks;
}



const createTask = async (newTask, userId) => {
    const task = await Task.create({
        task: newTask,
        user: userId
    });

    return { task };
}



const updateTask = async(taskId, data) => {
    const { task, completed } = data;
    const tasks = await Task.findById(taskId);

    if(!tasks) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    if(task) tasks.task = task; 
    
    if(typeof completed === "boolean") tasks.completed = completed;

    await tasks.save();

    return tasks;
}



const deleteTask = async (taskId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    await task.deleteOne();

    return "Task deleted";
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTasks
}
