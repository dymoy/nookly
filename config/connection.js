// connection.js

// Import the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');

// Utilize the 'dotenv' package to load the .env file
// Allows us to use environment variables for sensitive information
require('dotenv').config();

let sequelize;

// Check if the application is deployed on a service
if (process.env.JAWSDB_URL) {
  // If the application is deployed, use the provided database URL
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
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Export the sequelize connection to be imported in other parts of the application
module.exports = sequelize;
