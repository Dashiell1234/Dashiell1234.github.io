// node server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5500;

app.use(express.json());
app.use(express.static('public'));

const dataPath = path.join(__dirname, 'public', 'data.json');

// GET comments for a specific page (e.g. /comments/1 → comments1)
app.get('/comments/:page', (req, res) => {
  const page = req.params.page; // "1", "2", etc.
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    const json = JSON.parse(data);
    const key = `comments${page}`;
    res.json(json[key] || []);
  });
});

// POST new comment to a specific page
app.post('/comments/:page', (req, res) => {
  const page = req.params.page;
  const newComment = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });
    const json = JSON.parse(data);
    const key = `comments${page}`;

    if (!json[key]) json[key] = [];
    json[key].push(newComment);

    fs.writeFile(dataPath, JSON.stringify(json, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to write file' });
      res.status(200).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
