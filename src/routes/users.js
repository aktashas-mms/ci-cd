'use strict';

const { Router } = require('express');
const router = Router();

// In-memory store (demo amaçlı)
let users = [
  { id: 1, name: 'Ali Yılmaz',   email: 'ali@example.com',   role: 'admin' },
  { id: 2, name: 'Ayşe Kaya',   email: 'ayse@example.com',  role: 'user'  },
  { id: 3, name: 'Can Demir',   email: 'can@example.com',   role: 'user'  }
];

// GET /api/users
router.get('/', (_req, res) => {
  res.json({ count: users.length, data: users });
});

// GET /api/users/:id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /api/users
router.post('/', (req, res) => {
  const { name, email, role = 'user' } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const newUser = { id: users.length + 1, name, email, role };
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE /api/users/:id
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
