const express = require("express");
const indexRouter = express.Router();
const healthRoutes = require("./health.routes");
const authRoutes = require("./auth.routes");
const testRoutes = require("./test.routes");

indexRouter.use("/health", healthRoutes);
indexRouter.use("/test", testRoutes);
indexRouter.use("/auth", authRoutes);

module.exports = indexRouter;
