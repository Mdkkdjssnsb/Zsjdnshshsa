const express = require('express');
const { bing } = require('nayan-bing-api');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const key = "Nayan"; // Don't change key

// No need for bodyParser.json() since we're not using POST anymore

app.get('/api/bing', async (req, res) => {
  const prompt = req.query.prompt; // Get prompt from query parameters
  const cookie = req.query.cookie; // Get cookie from query parameters

  try {
    const data = await bing(prompt, cookie, key);
    const images = data.result;
    res.json({ images: images });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
