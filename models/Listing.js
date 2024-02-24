/**
 * @file Listing.js
 * Defines the Sequelize model `Listing` with the following attributes: 
 *  - id 
 *  - title
 *  - content
 *  - category 
 *  - price 
 *  - condition 
 *  - created_date 
 *  - is_sold 
 *  - img_file_name
 *  - user_id (references `User` model `id`) - the user that created the listing
 */

const { Model, DataTypes } = require ('sequelize');
const sequelize = require('../config/connection');

class Listing extends Model {}

Listing.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
        },
        category: {
            type: DataTypes.STRING, 
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_sold: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        img_file_name: {
            type: DataTypes.STRING,
            allowNull: false
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
        modelName: 'listing',
    }
);
    
 module.exports = Listing;