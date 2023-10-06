const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.use(express.json());

app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'Please provide one or more URLs.' });
  }

  const urlList = Array.isArray(urls) ? urls : [urls];
  const numbersData = [];

  for (const url of urlList) {
    try {
      const response = await axios.get(url);
      numbersData.push(response.data);
    } catch (error) {
      // Handle any potential errors with the remote URLs here
      return res.status(500).json({ error: `Error fetching data from ${url}: ${error.message}` });
    }
  }

  res.json({ data: numbersData });
});

app.listen(port, () => {
  console.log(`number-management-service is listening on port ${port}`);
});
