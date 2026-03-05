const { getTasks, createTask, deleteTask, updateTask } = require('./tasks.services');
const { asyncHandler } = require('../../middlewares/error.middleware');
const mongoose = require('mongoose');
const ApiResponse = require('../../utils/apiResponse');



const getTasksHandler = asyncHandler( async(req, res) => {
    const user = req.user;

    const response = await getTasks(user.id);

    res.status(200).json( new ApiResponse(true,"Getting tasks Successfully",response));
});



const createTaskHandler = asyncHandler( async (req, res) => {
    const { task } = req.body; 

    const response = await createTask(task, req.user.id );

    res.status(201).json( new ApiResponse(true, "Task created", response));
});



const updateTaskHandler = asyncHandler( async (req, res) => {
    const { task, completed } = req.body;
    const data = { task: task, completed: completed };
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
    const error = new Error("Invalid task ID");
    error.statusCode = 400;
    throw error;
    }

    if(!data) {
        const error = new Error("Invalid credecials");
        error.statusCode = 400;
        throw error;
    }

    const response = await updateTask(taskId, data);

    res.status(200).json( new ApiResponse(true, "Task updated", response));
});



const deleteTaskHandler = asyncHandler( async (req, res) => {
    const taskId = req.params.id;

    const response = await deleteTask(taskId);

    res.status(200).json( new ApiResponse(true, response));
})



module.exports = {
    getTasksHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
}

