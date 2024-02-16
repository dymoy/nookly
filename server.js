/* Require npm package dependencies*/
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

/* Require local routes and helpers */
const routes = require('./controllers');
const helpers = require('./utils/helpers');

/* Require sequelize */
const sequelize = require('./config/connection');

/* Instantiate the express app */
const app = express();
const PORT = process.env.PORT || 3001;

/* Set up Handlebars.js engine with custom helpers */
const hbs = exphbs.create({ helpers });

// TODO: Set up express session

/* Inform Express.js to use template engine handlebars */
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

/* Add middleware for body parsing and serving static files in /public */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

/* Sync sequelize models to the database, then turn on the server */
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
