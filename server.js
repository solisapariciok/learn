require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.use(express.static('public')); // serve frontend files from 'public' folder

const apiKey = process.env.DOG_API_KEY;

// Endpoint to get a random dog
app.get('/random-dog', async (req, res) => {
  try {
    const response = await fetch('https://api.thedogapi.com/v1/images/search?has_breeds=true', {
      headers: { 'x-api-key': apiKey }
    });
    const data = await response.json();
    res.json(data[0]); // send a single dog object
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch dog' });
  }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
