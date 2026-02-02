const express = require("express");
const indexRouter = express.Router();
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");

const meRoutes = require("./me.routes");
const transactionRoutes = require("./transaction.routes");

indexRouter.use("/health", healthRoutes);

indexRouter.use("/auth", authRoutes);
indexRouter.use(meRoutes);
indexRouter.use(transactionRoutes);

module.exports = indexRouter;
