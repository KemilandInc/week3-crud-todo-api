const express = require('express');
const app = express();

app.use(express.json()); // Parse JSON request bodies

// In-memory data
let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build CRUD API', completed: false }
];

// READ ALL TODOS
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// TASK 3: READ ACTIVE TODOS
app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  res.status(200).json(activeTodos);
});

// TASK 1: READ SINGLE TODO
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: 'Invalid todo ID' });
  }

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// TASK 2: CREATE TODO (VALIDATION)
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: 'Task field is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE TODO (PARTIAL)
app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  Object.assign(todo, req.body);
  res.status(200).json(todo);
});


// DELETE TODO
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = todos.length;

  todos = todos.filter(t => t.id !== id);

  if (todos.length === initialLength) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  res.status(204).send();
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Server error' });
});


// START SERVER
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
