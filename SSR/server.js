// SSR/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // for parsing application/json

// ✅ Path to your JSON file
const dataFilePath = path.join(__dirname, "data", "OnlineTrack.json");

// ✅ GET /data — load JSON
app.get("/data", (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }
    res.json(JSON.parse(data));
  });
});

// ✅ POST /update-data — write JSON
app.post("/update-data", (req, res) => {
  const newData = req.body;
  fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Write error:", err);
      return res.status(500).json({ error: "Failed to write data file" });
    }
    res.json({ success: true });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
