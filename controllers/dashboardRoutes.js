const router = require('express').Router();
const sequelize = require('../config/connection');
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      // use the ID from the session
      id: req.session.id
    },
    attributes: [
      'id',
      'title',
      'date_created',
      'content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'date_created',
      'content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      res.render('edit', {
        post,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/create/', withAuth, (req, res) => {
  BlogPost.findAll({
    where: {
      // use the ID from the session
      id: req.session.id
    },
    attributes: [
      'id',
      'title',
      'date_created',
      'content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('createpost', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;