const express = require("express");
const router = express.Router();
const healthController = require("../controllers/HealthController");

router.get("/", healthController.health);

module.exports = router;
