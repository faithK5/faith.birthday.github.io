const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route for home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle RSVP
app.post('/rsvp', (req, res) => {
  const { name, email, attending } = req.body;
  const rsvp = { name, email, attending, timestamp: new Date() };

  // Read existing RSVPs
  let rsvps = [];
  try {
    const data = fs.readFileSync('rsvps.json', 'utf8');
    rsvps = JSON.parse(data);
  } catch (err) {
    // File doesn't exist or is empty
  }

  // Add new RSVP
  rsvps.push(rsvp);

  // Write back to file
  fs.writeFileSync('rsvps.json', JSON.stringify(rsvps, null, 2));

  res.json({ message: 'RSVP submitted successfully!' });
});

// Route to get RSVPs (for admin or something)
app.get('/rsvps', (req, res) => {
  try {
    const data = fs.readFileSync('rsvps.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});