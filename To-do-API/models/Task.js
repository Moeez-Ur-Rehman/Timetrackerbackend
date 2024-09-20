const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  dueDate: { type: Date }, // Add dueDate field
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }, // Add completedAt field
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
