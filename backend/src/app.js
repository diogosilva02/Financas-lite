const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const router = require("./routes");

const publicPath = path.join(__dirname, "..", "..", "frontend");

app.use(express.json());
app.use(express.static(publicPath));
app.use(cors());
app.use("/api",router);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;
