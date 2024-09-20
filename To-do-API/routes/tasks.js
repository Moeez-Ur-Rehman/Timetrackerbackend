const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks for a user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  const { title, dueDate } = req.body;

  try {
    const newTask = new Task({
      title,
      dueDate, // Store due date
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});

// Update task (mark as completed)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.completed = req.body.completed ?? task.completed;
    task.completedAt = task.completed ? new Date() : null;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating task' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      // Validate task and check ownership
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }
  
      await Task.deleteOne({ _id: req.params.id });
      res.json({ message: 'Task successfully deleted' });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error. Could not delete task.' });
    }
  });
  
  module.exports = router;
