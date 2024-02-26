/* Require npm package dependencies*/
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
require('dotenv').config();

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
	secret: process.env.SESS_SECRET,
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
app.use("/uploads", express.static(path.join(__dirname, "/public/uploads")));

app.use(routes);

/* Set up multer to define where files should be saved */
const s3 = new S3Client({
	credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION 
});

const s3Storage = multerS3({
	s3: s3, 
	bucket: "nookly", 
	acl: "public-read", 
	metadata: (req, file, cb) => {
		cb(null, {fieldname: file.fieldname})
	},
	key: (req, file, cb) => {
		const fileName = Date.now() + "_" + file.originalname;
		cb(null, fileName);
	}
});

const upload = multer({
    storage: s3Storage,
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
})

app.post('/upload', upload.single('listing-img'), function (req, res, next) {
	if (req.file) {
		res.status(200).json({
			filename: req.file.key
		});
	}
});

/* Sync sequelize models to the database, then turn on the server */
sequelize.sync({ force: false }).then(() => {
  	app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
