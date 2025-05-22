// SSR/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // for parsing application/json

// ✅ Path to your JSON file (e.g., ./data/OnlineTrack.json)
const OnlineTrackData = path.join(__dirname, "data", "OnlineTrack.json");
const listDemoData = path.join(__dirname, "data", "ListDemo.json");

// ✅ GET /data — Load data from file
app.get("/data", (req, res) => {
  fs.readFile(OnlineTrackData, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error("Parse error:", parseErr);
      res.status(500).json({ error: "Corrupted JSON data" });
    }
  });
});

app.post("/update-data", (req, res) => {
  const newData = req.body;
  fs.writeFile(OnlineTrackData, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Write error:", err);
      return res.status(500).json({ error: "Failed to write data file" });
    }
    res.json({ success: true });
  });
});

app.get("/list-demo-data", (req, res) => {
  console.log("Received request /list-demo-data");
  fs.readFile(listDemoData, "utf8", (err, data) => {
    if (err) {
      console.error("Read error (ListDemo):", err);
      return res.status(500).json({ error: "Failed to read ListDemo data file" });
    }
    try {
      const jsonData = JSON.parse(data);
      console.log("ListDemo data loaded:", jsonData);
      res.json(jsonData);
    } catch (parseErr) {
      console.error("Parse error (ListDemo):", parseErr);
      res.status(500).json({ error: "Corrupted JSON data in ListDemo" });
    }
  });
});

app.post("/update-list-demo-data", (req, res) => {
  const newData = req.body;
  fs.writeFile(listDemoData, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Write error (ListDemo):", err);
      return res.status(500).json({ error: "Failed to write ListDemo data file" });
    }
    res.json({ success: true });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
