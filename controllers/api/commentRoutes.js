const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(CommentData => res.json(CommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        Comment.create({
            content: req.body.content,
            user_id: req.session.user_id,
            post_id: req.body.post_id

        })
            .then(CommentData => res.json(CommentData))
            .catch(err => {
                res.status(500).json(err);
            });
    }
});

router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(CommentData => {
          if (!CommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(CommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;