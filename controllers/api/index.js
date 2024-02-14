const router = require('express').Router();
const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const commentRoutes =  require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/listing', listingRoutes);
router.use('/comment', commentRoutes);

module.exports = router;