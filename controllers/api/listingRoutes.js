/**
 * @file listingRoutes.js
 * Implements the API routes for the `Listing` model
 * Supported routes: GET all, GET by id, POST create, PUT update by id, DELETE remove by id
 */

const router = require('express').Router();
const { User, Listing, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * @route GET '/api/listings'
 * Finds and returns all listing data, including associated User and Comment data 
 */
router.get('/', async (req,res) => {
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
    
        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/api/listings/:id'
 * Find and return the Listing data by id, including associated User and Comment data
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

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/listings/'
 * Creates a listing and adds it to the database 
 */
router.post('/', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            price: req.body.price,
            condition: req.body.condition,

            created_date: new Date(),
            is_sold: false,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(listingData);
    } catch (err) {
        // Listing instance failed to be created due to bad request
        res.status(400).json(err);
    }
});

/**
 * @route PUT '/api/listings/:id'
 * Updates a listing by id using data from req.body
 */
router.put('/:id', withAuth, async (req, res)=> {
    try {
        const listingData = await Listing.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!listingData) { 
            res.status(404).json({
                message: 'No listing data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route DELETE '/api/listings/:id'
 * Deletes a listing by id 
 */
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const listingData = await Listing.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!listingData) { 
            res.status(404).json({
                message: 'No listing data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(listingData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
