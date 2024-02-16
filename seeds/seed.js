const { User, Listing, Comment } = require('../models');
const sequelize = require('../config/connection');

const userData = require('./userData.json');
const listingData = require('./listingData');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData);
    await Listing.bulkCreate(listingData);
    await Comment.bulkCreate(commentData);
    
    process.exit(0);
};

seedDatabase();