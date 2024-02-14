const User = require('./User');
const Listing = require('./Listing');
const Comment = require('./Comment');

// User Associations 
User.hasMany(Listing, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Listing Associations 
Listing.belongsTo(User, {
    foreignKey: 'user_id'
});

Listing.hasMany(Comment, {
    foreignKey: 'listing_id',
    onDelete: 'CASCADE'
});
 
// Comment Associations 
Comment.belongsTo(Listing, {
    foreignKey: 'listing_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, Listing, Comment };
