const { Model, DataTypes } = require ('sequelize');
const bcrypt = require('bcrypt');
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