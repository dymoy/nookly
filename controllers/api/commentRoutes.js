const router = require('express').Router();
const { User, Listing, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Finds and returns all comments
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

// Finds a specific comment  with the requested id that includes an id from the User and Listing as well
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id,
            {
                attributes: ['id', 'content', 'created_date'],
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
            }
        );

        res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    
})

// Creates a comment
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

// Deletes comment with specific id
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