const router = require('express').Router();
const { User, Listing, Comment } = require('../../models');

// Finds and returns all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();
        
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
                        attributes: [
                            'id'
                        ]
                    },
                    {
                        model: Listing,
                        attributes: [
                            'id'
                        ]
                    }
                ]
            });

        res.status(200).json(commentData);
        }catch (err) {
            res.status(500).json(err);
        }
    
})

// Creates a comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({...req.body,
      user_id  });

      res.status(200).json({
        message: 'Comment created!'
      });
        }catch (err) {
            res.status(400).json(err);
        }
});

// Deletes comment with specific id
router.delete('/:id', async (req, res) => {
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