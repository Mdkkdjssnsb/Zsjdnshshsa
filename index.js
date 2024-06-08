const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // Don't change key
const cookie = "1QCDvczQOrBnMEJl_thKkWU8Zm1JYqbkdGGu7UBp42XxNWiypK0MsM4u2UJHlyspwlJX54trUaFEddEkrWUe9EnKf4ad4FDOgV_2G0O4aRnbVM8i_FZDvxFrKnxbBbJOLlgIrL8p3cDZIKPmi_XCyBJiJjTVH-IJ33XGBZhscLY4NF9os7GPYW5cb8VI5l_cwqv3h3lloCYL3A9M1SYBjpYzNb-tvYTQ1oJ2Ym5mvngA"; // Paste your Bing cookie here

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
