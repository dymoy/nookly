/**
 * @file commentRoutes.js
 * Implements the API routes for the `Comment` model
 * Supported routes: GET read all, POST create, DELETE remove by id
 */

const router = require('express').Router();
const { User, Listing, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

/**
 * @route GET '/api/comments/'
 * Finds and returns all Comment data in the database, including associated User and Listing data 
 */
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Listing,
                    attributes: ['id', 'title', 'content', 'category', 'price', 'condition', 'created_date', 'is_sold']
                }
            ]
        });
        
        if(!commentData) {
            res.status(404).json({
                message: 'No comment was found',
            });
            return;
        }
        res.status(200).json(commentData);
          }catch (err) {
            res.status(500).json(err);
          }
});

/**
 * @route POST '/api/comments/'
 * Creates a Comment using req.body and req.session information
 */
router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                content: req.body.content,
                listing_id: req.body.listing_id,
                created_date: new Date(),
                user_id: req.session.user_id,
            });

            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

/**
 * @route DELETE '/api/comments/:id'
 * Deletes a Comment by id 
 */
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if(!commentData){
            res.status(400).json({
                message: 'No comment data was found under requested id'
            });
            return;
        }

        res.status(200).json(commentData);
    }  catch(err) {
        res.status(400).json(err);
    }
});

module.exports = router;