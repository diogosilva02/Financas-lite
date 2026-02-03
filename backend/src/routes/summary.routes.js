const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddleware");
const SummaryController = require("../controllers/SummaryController");

router.get("/summary", auth, SummaryController.get);

module.exports = router;
