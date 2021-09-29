const router = require("express").Router();
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentsRoutes');
const userRoutes = require('./peopleRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router