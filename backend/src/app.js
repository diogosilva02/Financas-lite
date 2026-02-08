const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const router = require("./routes");

const publicPath = path.join(__dirname, "..", "..", "frontend");

app.use(express.json());
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(publicPath, "login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(publicPath, "register.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use(cors());
app.use("/api", router);

module.exports = app;
