/**
 * @file userRoutes.js
 * Implements the API routes for the `User` model
 * Supported routes: GET all, GET by id, POST create, PUT update by id, DELETE remove by id
 */

const router = require('express').Router();
const { User, Listing, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * @route GET '/api/users'
 * Finds and returns all user data in the database, excluding the password of the users
 */
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            // Include all data except the user password
            attributes: { exclude: ['password'] }
        });
    
        if(!userData) {
            res.status(404).json({
                message: 'No user data was found in the database.',
            });
            return;
        }
    
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route GET '/api/users/:id'
 * Finds and returns the user data with the requested id, including the associated Listing and Comment data 
 */
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(
            req.params.id, 
            {
                attributes: ['id', 'username', 'email'],
                include: [
                    { 
                        model: Listing,
                        attributes: [
                            'id', 
                            'title', 
                            'description', 
                            'category',
                            'price',
                            'condition',
                            'created_date',
                            'is_sold'
                        ]
                    },
                    {
                        model: Comment,
                        atrributes: ['id', 'content', 'created_date'],
                        include: {
                            model: Listing,
                            attributes: ['id', 'title']
                        }
                    }
                ],
            },
        );

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

/**
 * @route POST '/api/users/'
 * Creates a `User` and adds it to the database 
 */
router.post('/', async (req, res) => {
    try { 
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }); 
        
        // Once the user was created, log them in by saving session data 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
      
            res.status(200).json({ 
                user: userData, 
                message: 'You are now logged in!' 
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * @route DELETE '/api/users/:id'
 * Removes the requested user by id
 * TODO: add withAuth to parameters 
 */
router.delete('/:id', async (req, res) => {
    try { 
        const userData = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!userData) {
            res.status(404).json({
                message: 'No user data was found for the requested id.'
            });
            return;
        }

        res.status(200).json(userData);
    } catch(err) {
        res.status(500).json(err);
    }
});

// TODO: Implement POST /login to check entered login credentials and set session.loggedIn to true

// TODO: Implement POST /logout to destroy the current session 


module.exports = router;
