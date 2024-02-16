const router = require('express').Router();

const userRoutes = require('./userRoutes');
const listingRoutes = require('./listingRoutes');
const commentRoutes =  require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/listings', listingRoutes);
router.use('/comments', commentRoutes);

module.exports = router;