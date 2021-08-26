const router = require("express").Router();

const homeRoutes = require("./homeRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const loginRoutes = require("./loginRoutes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/login", loginRoutes);
router.use("/api", apiRoutes);

module.exports = router;