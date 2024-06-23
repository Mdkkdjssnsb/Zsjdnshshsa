const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // Don't change key
const cookie = "1jtANeU8kziBoUmpkmoRAQhAKHyBL-E5mMS-HR9XPNZGwLC8Bz9UFugmRZebNu8Prg2Kldh6uzBFUnzKiBqR0PE6KDsmSTS-SbUPqmK0slYFHmIS2Z5_oORq8Qy8bRiYZWw2FSDe_oiJAg7G5lAmnDGO4Q6fCCklh_QxrhYyWqXkYBBTjIsPqrjOW5mDqkPUbsdyJCkR95LwwNDPfF96gtE_FhR_j4qzvRJxxFFwM1-0"; // Paste your Bing cookie here

app.get('/q', async (req, res) => {
  const prompt = req.query.prompt || "cat"; // Get prompt from query parameter, default to "cat"

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
