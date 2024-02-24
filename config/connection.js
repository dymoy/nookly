/**
 * @file connection.js
 * Creates the Sequelize instance to connect to the database
 *   
 * @see ../server.js
 */

// Import the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');

// Utilize the 'dotenv' package to load the .env file
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
	// Use JawsDB_URL to work with Heroku deployment
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  	// If the application is running locally, set up Sequelize with the local database credentials
	sequelize = new Sequelize(
		process.env.DB_NAME, // Name of the local db
		process.env.DB_USER, // Username for db
		process.env.DB_PASSWORD, // Password for db
		{
			host: 'localhost', // db host
			dialect: 'mysql', // db dialect
			port: 3306, // Default for MySQL
		}
	);
}

// TEST CONNECTION
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection to the database has been established successfully.');
  }).catch(err => {
    	console.error('Unable to connect to the database:', err);
  });

// Export the sequelize connection to be imported in other parts of the application
module.exports = sequelize;
