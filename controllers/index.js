const router = require("express").Router();

const apiRoute = require("./api");
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoute);

module.exports = router;
