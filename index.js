const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // Don't change key
const cookie = "1CKjPIxmWJu5hyuEdHfdZ6iVYMcYZheMSQuKtRcWTbvzQsNky0bX2RSazd86BgvJi6FTf3GDj1qieABuinzP0Q-Ne4TInHKMAm89dDaFh2s6iOd2emdJYFr23zs1SYdkSj3jhYlqEocU15aqgpm_UF5I2qHqN6I4FKs5_XLCIc23PQ_1VP5WQq2NThtVSeDHS3uatCvprzd4bXUWITUM2y_Qc0vWzmtDSuRJtGZRFQPo"; // Paste your Bing cookie here

app.get('/api/bing', async (req, res) => {
  const prompt = req.query.prompt; // Get prompt from query parameter, default to "cat"

  try {
    const data = await bing(prompt, cookie, key);
    const images = data.result; // Corrected variable name and accessing data
    res.json({ images: images }); // Corrected syntax for sending JSON response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
