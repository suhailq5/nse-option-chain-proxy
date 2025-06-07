const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/api/option-chain-indices", async (req, res) => {
  const symbol = req.query.symbol || "NIFTY";
  try {
    const response = await axios.get(`https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "Referer": "https://www.nseindia.com/option-chain",
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data", detail: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));