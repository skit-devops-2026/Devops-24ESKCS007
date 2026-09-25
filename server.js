const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todos";

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection with timeout
mongoose.connect(MONGO_URL, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => {
    console.log(`MongoDB connected successfully at ${MONGO_URL}`);
  })
  .catch((err) => {
    console.error(`MongoDB connection error: ${err.message}`);
  });

// Todo Schema & Model
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Todo = mongoose.model('Todo', todoSchema);

// Helper validation
function isValidTodoText(text) {
  return typeof text === 'string' && text.trim().length > 0;
}

// Routes
// GET /todos - Fetch all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /todos - Add a new todo
app.post('/todos', async (req, res) => {
  try {
    const text = req.body.text || req.body.title;
    if (!isValidTodoText(text)) {
      return res.status(400).json({ error: 'Todo text is required and cannot be empty' });
    }
    const todo = new Todo({ text: text.trim() });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
