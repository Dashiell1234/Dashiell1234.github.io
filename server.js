const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const dataPath = path.join(__dirname, 'public', 'data.json');

// Get comments
app.get('/comments', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read comments' });
    res.json(JSON.parse(data));
  });
});

// Post new comment
app.post('/comments', (req, res) => {
  const newComment = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read file' });

    const json = JSON.parse(data);
    json.comments.push(newComment);

    fs.writeFile(dataPath, JSON.stringify(json, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Failed to write comment' });
      res.status(200).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
