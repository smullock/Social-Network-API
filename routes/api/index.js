const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/apps', thoughtRoutes);
router.use('/users', userRoutes);
router.use('/users', reactionRoutes);

module.exports = router;