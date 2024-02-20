/**
 * @file homeRoutes.js
 * Implements the home page API routes to render handlebars files
 * 
 * @see  ../views/home.handlebars
 */

const router = require('express').Router();
const { Listing, User, Comment } = require('../models');

/**
 * @route GET '/' 
 * Finds and returns all `Listings` in the database to render in homepage.handlebars
 */
router.get('/', async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            // Order the data by created_date in descending order 
            order: [['created_date', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'created_date'],
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                }
            ],
        });
    
        // Validate listing data was found in the database
        if (!listingData) {
            res.status(404).json({
                message: 'No listing data was found in the database.'
            });
            return;
        }

        // Serialize and render the post data in homepage.handlebars
        const listings = listingData.map(listing => listing.get({ plain: true }));
        res.render('home', { 
            listings,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/:id'
 * Finds and and returns Post data by id to render in single-post.handlebars
 */
router.get('/:id', async (req, res) => {
    try { 
        const listingData = await Listing.findByPk(
            req.params.id, 
            {
                include: [
                    { 
                        model: User,
                        attributes: ['id', 'username'],
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'created_date'],
                        include: {
                            model: User,
                            attributes: ['id', 'username']
                        }
                    }
                ]
        });
        
        if (!listingData) {
            res.status(404).json({
                message: 'No listing data was found for the requested id.'
            });
            return;
        }

        // Serialize and render the listing data in single-post.handlebars
        const listing = listingData.get({ plain: true});
        req.render('single-post', {
            listing,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/login'
 * Redirects the user to login.handlebars page
 */
router.get('/login', (req, res) => {
    try {
        // If the user is already logged in, redirect to the home page
        if (req.session.loggedIn) {
            res.redirect('/');
            return;
        }

        // If the user is not logged in, render login.handlebars for the user to login
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/signup'
 * Redirects the user to the signuo.handlebars page
 */
router.get('/signup', (req, res) => {
    try { 
        // If the user is logged in, redirect them to the homepage.handlebars page
        if (req.session.loggedIn) {
          res.redirect('/');
          return;
        }
      
        // If the user is not logged in, render signup.handlebars for the user to sign up 
        res.render('signup');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
