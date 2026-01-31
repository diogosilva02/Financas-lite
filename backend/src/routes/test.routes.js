const express = require("express");
const router = express.Router();
const testController = require("../controllers/TestController");

router.get("/test-user", testController.createTestUser);

module.exports = router;
