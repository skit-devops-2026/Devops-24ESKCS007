const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const client = require('prom-client');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/todos";

// Prometheus Metrics Instrumentation
const register = new client.Registry();
client.collectDefaultMetrics({ register, prefix: 'node_' });

// HTTP Request Duration Histogram
const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5]
});
register.registerMetric(httpRequestDurationMicroseconds);

// HTTP Requests Total Counter
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests processed',
  labelNames: ['method', 'route', 'status_code']
});
register.registerMetric(httpRequestsTotal);

// Todo Operations Counter
const todoOperationsTotal = new client.Counter({
  name: 'todo_operations_total',
  help: 'Total number of To-Do items operations (create, delete, list)',
  labelNames: ['operation', 'status']
});
register.registerMetric(todoOperationsTotal);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Metrics recording middleware
app.use((req, res, next) => {
  const start = process.hrtime();
  res.on('finish', () => {
    const elapsed = process.hrtime(start);
    const durationInSeconds = elapsed[0] + elapsed[1] / 1e9;
    const route = req.route ? req.route.path : req.path;
    httpRequestsTotal.inc({ method: req.method, route, status_code: res.statusCode });
    httpRequestDurationMicroseconds.observe({ method: req.method, route, status_code: res.statusCode }, durationInSeconds);
  });
  next();
});

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

const { isValidTodoText } = require('./utils');

// Health Check Endpoint
app.get('/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(200).json({
    status: 'UP',
    database: isDbConnected ? 'connected' : 'disconnected',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Prometheus Metrics Scrape Endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err.message);
  }
});

// Routes
// GET /todos - Fetch all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    todoOperationsTotal.inc({ operation: 'list', status: 'success' });
    res.json(todos);
  } catch (err) {
    todoOperationsTotal.inc({ operation: 'list', status: 'error' });
    res.status(500).json({ error: err.message });
  }
});

// POST /todos - Add a new todo
app.post('/todos', async (req, res) => {
  try {
    const text = req.body.text || req.body.title;
    if (!isValidTodoText(text)) {
      todoOperationsTotal.inc({ operation: 'create', status: 'invalid_input' });
      return res.status(400).json({ error: 'Todo text is required and cannot be empty' });
    }
    const todo = new Todo({ text: text.trim() });
    const saved = await todo.save();
    todoOperationsTotal.inc({ operation: 'create', status: 'success' });
    res.status(201).json(saved);
  } catch (err) {
    todoOperationsTotal.inc({ operation: 'create', status: 'error' });
    res.status(500).json({ error: err.message });
  }
});

// DELETE /todos/:id - Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      todoOperationsTotal.inc({ operation: 'delete', status: 'not_found' });
      return res.status(404).json({ error: 'Todo not found' });
    }
    todoOperationsTotal.inc({ operation: 'delete', status: 'success' });
    res.json({ message: 'Todo deleted successfully', id });
  } catch (err) {
    todoOperationsTotal.inc({ operation: 'delete', status: 'error' });
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

