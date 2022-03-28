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



router.get('/login', (req,res) => {
    console.log(req.session)
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});


module.exports = router;

