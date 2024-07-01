const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // Replace with your actual API key

// Route for fetching images from Bing API
app.get('/api/bing', async (req, res) => {
  const { prompt, cookie } = req.query;

  // Validate inputs
  if (!prompt || !cookie) {
    return res.status(400).json({ error: "Missing required parameters: prompt and cookie are required." });
  }

  try {
    const data = await bing(prompt, cookie, key);
    const urls = data.result;

    // Check if data.result is an array (or whatever structure you expect)
    if (!Array.isArray(urls)) {
      return res.status(500).json({ error: "Unexpected response format from Bing API." });
    }

    res.json({ images: urls }); // Adjusted to use consistent field name 'images'
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
