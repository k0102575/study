const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let todos = [{ id: 1, text: '샘플 TODO', done: false }];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });
  const newTodo = { id: Date.now(), text, done: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  todos = todos.filter((todo) => todo.id !== id);
  res.status(204).end();
});

app.get('/', (req, res) => res.send('Hello from Express!'));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
