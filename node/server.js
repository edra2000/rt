const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // ✅ الآن تعمل بشكل صحيح

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('مرحبًا بك في الخادم!');
});

app.get('/crypto', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: `فشل في جلب البيانات: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`الخادم يعمل على http://localhost:${port}`);
});
