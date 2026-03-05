const express = require('express');
const { createTaskHandler, deleteTaskHandler, getTasksHandler, updateTaskHandler } = require('./tasks.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/tasks', authMiddleware, getTasksHandler);
router.post('/tasks', authMiddleware, createTaskHandler);
router.delete('/tasks/:id', authMiddleware, deleteTaskHandler);
router.patch('/tasks/:id', authMiddleware, updateTaskHandler);

module.exports = router;


