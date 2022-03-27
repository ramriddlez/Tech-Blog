const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/create', async (req, res) => {
    try {

        res.render('createpost', { loggedIn: req.session.loggedIn });

    } catch (err) {
        res.status(500).json(err);
    }
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


router.get('/:id', (req, res) => {
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
            // include the Comment model here:
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'post_id', 'user_id', 'date_created'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.post('/create', withAuth, (req, res) => {
//     BlogPost.create({
//         title: req.body.title,
//         content: req.body.content,
//         user_id: req.session.id,
//     })
//         .then((dbPostData) => res.json(dbPostData))
//         .catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });




// router.post('/create', async (req, res) => {
//     try {
//         const postData = await BlogPost.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id
//         });

//         console.log(postData);

//         res.json({ message: 'Post successfully created!' });
//         if (!postData) {
//             res.status(404).json({ message: 'No post found with this id!' });
//             return;
//         }

//         res.render('dashboard', {
//             loggedIn: req.session.loggedIn
//         });


//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const post = postData.get({ plain: true });
        console.log(post);

        res.render('editpost', {
            ...post, loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});




router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.update({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        }, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.render('dashboard', {
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.render('dashboard', {
            loggedIn: req.session.loggedIn
        });

    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;