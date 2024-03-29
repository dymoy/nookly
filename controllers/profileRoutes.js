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

/**
 * @route GET '/addListing'
 * Checks the session user, finds the listing data for the user, and returns data to render in addListing.handlebars
 */
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

/**
 * @route GET '/update/:id'
 * Checks the session user, finds the Listing data by id for the user, and returns data to render in updateListing.handlebars
 */
router.get('/update/:id', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.findOne({
            where: {
                id: req.params.id,
            },
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

        // Serialize and render the data in update-post.handlebars
        const listing = listingData.get({ plain: true });
        res.render('updateListing', {
            listing,
            loggedIn: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
