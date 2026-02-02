const express = require("express");
const router = express.Router();
const MeController = require("../controllers/MeController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/me", auth, MeController.me);

module.exports =  router;
