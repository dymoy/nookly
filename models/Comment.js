/**
 * @file Comment.js
 * Defines the Sequelize model `Comment` with the following attributes: 
 *  - id 
 *  - content
 *  - created_date
 *  - listing_id (references `Listing` model by `id`) - the listing of which the comment is replied to 
 *  - user_id (refrences `User` model by `id`) - the user that created the comment
 */

const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        listing_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'listing',
              key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key:'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);
    
module.exports = Comment;