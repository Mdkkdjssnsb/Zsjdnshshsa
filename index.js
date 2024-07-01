const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // API key, should be kept secure

// Route for fetching images from Bing API
app.get('/api/bing', async (req, res) => {
  const { prompt, cookie } = req.query;

  try {
    const data = await bing(prompt, cookie, key);
    const images = data.result;
    res.json({ images: images });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
