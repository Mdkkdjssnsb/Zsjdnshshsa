const express = require('express');
const { bing } = require('nayan-bing-api');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Store allowed API keys
const allowedApiKeys = ["test"];

const key = "Nayan"; // Don't change key
const cookie = "1CKjPIxmWJu5hyuEdHfdZ6iVYMcYZheMSQuKtRcWTbvzQsNky0bX2RSazd86BgvJi6FTf3GDj1qieABuinzP0Q-Ne4TInHKMAm89dDaFh2s6iOd2emdJYFr23zs1SYdkSj3jhYlqEocU15aqgpm_UF5I2qHqN6I4FKs5_XLCIc23PQ_1VP5WQq2NThtVSeDHS3uatCvprzd4bXUWITUM2y_Qc0vWzmtDSuRJtGZRFQPo"; // Paste your Bing cookie here

// Middleware for parsing JSON requests
app.use(bodyParser.json());

app.post('/api/bing', async (req, res) => {
  const apiKey = req.headers.apikey;

  // Check if API key is provided and valid
  if (!apiKey || !allowedApiKeys.includes(apiKey)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const prompt = req.body.prompt || 'cat'; // Get prompt from request body, default to "cat"

  try {
    const data = await bing(prompt, cookie, key);
    const images = data.result;
    res.json({ images: images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
