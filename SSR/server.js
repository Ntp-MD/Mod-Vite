// SSR/server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const OnlineTrackDataFile = path.join(__dirname, "data", "OnlineTrack.json");

//********************************************************************************************//

//********************************************************************************************//
app.get("/OnlineTrackGetData", (req, res) => {
  console.log("Received request /OnlineTrackGetData");
  fs.readFile(OnlineTrackDataFile, "utf8", (err, data) => {
    // Use the defined variable here
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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
