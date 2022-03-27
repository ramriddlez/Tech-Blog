const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');



router.get('/', withAuth, async (req, res) => {
  BlogPost.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.id
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
      }]
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

router.post('/create', async (req, res) => {
  try {
      const postData = await BlogPost.create({
          title: req.body.title,
          content: req.body.content,
          
          
      });

      console.log(postData);

      res.json({ message: 'Post successfully created!' });
      res.render('dashboard', { loggedIn: req.session.loggedIn });

  } catch (err) {
      res.status(500).json(err);
  }
});



module.exports = router;