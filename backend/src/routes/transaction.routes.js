const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/TransactionController");
const { auth } = require("../middlewares/authMiddleware");

router.get("/transactions", auth, TransactionController.list);
router.post("/transactions", auth, TransactionController.create);
router.put("/transactions/:id", auth, TransactionController.update);
router.delete("/transactions/:id", auth, TransactionController.remove);

module.exports = router;
