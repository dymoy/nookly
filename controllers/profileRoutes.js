/**
 * @file profileRoutes.js
 * Implements the profile page API routes to render handlebars files
 * 
 * @see  ../views/profile.handlebars
 */

const router = require('express').Router();
const { Listing, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

/** 
 * @route GET '/profile'
 * Checks the session user, finds the listing data for the user, and returns data to render in profile.handlebars
 */
router.get('/', withAuth, async (req, res) => {
    try { 
        const listingData = await Listing.findAll({
            where: {
                // Filter the listings using user_id defined in the session
                user_id: req.session.user_id
            },
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

        // Serialize and render the data in .handlebars
        const listings = listingData.map((listing) => listing.get({ plain: true }));

        res.render('profile', {
            listings,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Add route to GET '/profile/addListing' 
router.get('/addListing', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.findAll({
            where: {
                // Filter the listings using user_id defined in the session
                user_id: req.session.user_id
            },
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
            ]
        });

        // Serialize and render the data in addListing.handlebars
        const listings = listingData.map(listing => listing.get({ plain: true }));
        res.render('addListing', {
            listings,
            loggedIn: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO: Add route to GET '/profile/update/:id'

module.exports = router;
