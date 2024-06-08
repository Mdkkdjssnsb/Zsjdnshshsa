const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // Don't change key
const cookie = "13puxb_VkQ1iJtwVp3cYumvILjLrS4QayQFb5Z-rELc-CnXfNbmQvpAR63g6YW0AYqPzP0ND8xkc72zbhWoNR5uvJiC0tkdhg8SxYlba6pXkvYAqGRHOME4Rqy2QaiA1uYpyQ3GgiagnDHJL7lYUVWXsMh4IsOlnmxjy0ZrN74ImEx_GubdOzfpNBS7u0rqNxHA1UXhwGzaWtCAaW62Ek8ab3j1OO6Rhc_ie1Al4DKaM"; // Paste your Bing cookie here

app.get('/q', async (req, res) => {
  const prompt = req.query.prompt; // Get prompt from query parameter, default to "cat"

  try {
    const data = await bing(prompt, cookie, key);
    res.json(data.result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
