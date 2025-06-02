// SSR/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const OnlineDisplayData = path.join(__dirname, "data", "OnlineDisplay.json");
const DemoDisplayData = path.join(__dirname, "data", "DemoDisplay.json");

app.get("/OnlineDisplayGet", (req, res) => {
  fs.readFile(OnlineDisplayData, "utf8", (err, data) => {
    if (err) {
      console.error("Read error", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      console.error("Parse error", parseErr);
      res.status(500).json({ error: "Corrupted JSON data" });
    }
  });
});

app.post("/OnlineDisplayPost", (req, res) => {
  const newData = req.body;
  fs.writeFile(OnlineDisplayData, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Write error:", err);
      return res.status(500).json({ error: "Failed to write data file" });
    }
    res.json({ success: true });
  });
});

//********************************************************************************************//
app.get("/DemoDisplayGet", (req, res) => {
  console.log("Received request /DemoDisplayGet");
  fs.readFile(DemoDisplayData, "utf8", (err, data) => {
    if (err) {
      console.error("Read error:", err);
      return res.status(500).json({ error: "Failed to read data file" });
    }
    try {
      const jsonData = JSON.parse(data);
      console.log("data loaded:", jsonData);
      res.json(jsonData);
    } catch (parseErr) {
      console.error("Parse error", parseErr);
      res.status(500).json({ error: "Corrupted JSON data" });
    }
  });
});

app.post("/DemoDisplayPost", (req, res) => {
  const newData = req.body;
  fs.writeFile(DemoDisplayData, JSON.stringify(newData, null, 2), (err) => {
    if (err) {
      console.error("Write error", err);
      return res.status(500).json({ error: "Failed to write data file" });
    }
    res.json({ success: true });
  });
});

//********************************************************************************************//

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
