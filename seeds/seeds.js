const { User, Listing, Comment } = require('../models');

const userData = require('./userData.json');
const listingData = require('./listingData');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const listing of listingData) {
        await Listing.create({
            ...listing,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const comments of commentData) {
        await Comment.create({
            ...comments,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();