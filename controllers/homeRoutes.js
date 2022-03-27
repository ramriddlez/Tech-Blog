const router = require('express').Router();
const  { User, BlogPost, Comment } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req,res) => {
    try {
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        console.log(posts);
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req,res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['content','date_created','user_id'],
                }
            ],
        });

        const post = postData.get({ plain: true})
        res.render('postInfo', {
            post,
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/dashboard', withAuth, async (req,res) => {
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


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
});

module.exports = router;

