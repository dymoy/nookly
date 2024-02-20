/* Require npm package dependencies*/
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');

/* Require local routes and helpers */
const routes = require('./controllers');
const helpers = require('./utils/helpers');

/* Require sequelize and sequelize store for session */
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

/* Instantiate the express app */
const app = express();
const PORT = process.env.PORT || 3001;

/* Set up Handlebars.js engine with custom helpers */
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'nookly-cranly',
  cookie: {
    // Set the session time limit to 15 minutes
    maxAge: 15 * 30 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

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
