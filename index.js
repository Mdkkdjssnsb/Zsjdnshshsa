const express = require('express');
const { bing } = require('nayan-bing-api');
const app = express();
const port = 3000;

const key = "Nayan"; // API key, should be kept secure

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Example database or data store for banned UIDs, IPs, and cookies
let bannedUIDs = [];
let bannedIPs = [];
let bannedCookies = [];

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Middleware function to check if UID is banned
function checkUIDBan(req, res, next) {
  const { uid } = req.query;
  if (bannedUIDs.includes(uid)) {
    return res.status(403).json({ error: 'UID is banned' });
  }
  next();
}

// Middleware function to check if IP is banned
function checkIPBan(req, res, next) {
  const ip = req.ip; // Express automatically gets IP from request
  if (bannedIPs.includes(ip)) {
    return res.status(403).json({ error: 'IP is banned' });
  }
  next();
}

// Middleware function to check if cookie is banned
function checkCookieBan(req, res, next) {
  const { cookie } = req.query;
  if (bannedCookies.includes(cookie)) {
    return res.status(403).json({ error: 'Cookie is banned' });
  }
  next();
}

// Rate limiting middleware
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS middleware
const cors = require('cors');
app.use(cors());

// Route for fetching images from Bing API
app.get('/api/bing', checkUIDBan, checkIPBan, checkCookieBan, async (req, res) => {
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

// Example route to add a UID to ban list
app.post('/api/ban/uid', (req, res) => {
  const { uid } = req.body;
  bannedUIDs.push(uid);
  res.json({ message: `UID ${uid} banned successfully` });
});

// Example route to add an IP to ban list
app.post('/api/ban/ip', (req, res) => {
  const { ip } = req.body;
  bannedIPs.push(ip);
  res.json({ message: `IP ${ip} banned successfully` });
});

// Example route to add a cookie to ban list
app.post('/api/ban/cookie', (req, res) => {
  const { cookie } = req.body;
  bannedCookies.push(cookie);
  res.json({ message: `Cookie ${cookie} banned successfully` });
});

// Endpoint to retrieve detailed HTTP status codes information
app.get('/api/status-codes', (req, res) => {
  const statusCodes = require('http').STATUS_CODES;
  const statusCodesInfo = Object.keys(statusCodes).map(code => ({
    code: parseInt(code),
    message: statusCodes[code]
  }));
  res.json({ statusCodes: statusCodesInfo });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
