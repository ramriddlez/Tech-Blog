const router = require('express').Router();
const { BlogPost, User, Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/create',  withAuth, async (req,res) => {
    try{

        res.render('createpost', {loggedIn: req.session.loggedIn});

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req,res) => {
    try{
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

router.get('/:id', async (req,res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User, 
                    attributes: ['username'],
                },
                {
                    model: BlogPost,
                    attributes: ['title, content, comment_count, date_created']
                },
            ],
        });

        const post = postData.get({ plain: true})

        if(postData.comment_count != 0) {
            const postData = await BlogPost.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Comment,
                        attributes: ['content','date_created','user_id'],
                    },
                ],
            });

            const post = postData.get({ plain: true });

            console.log(post);

            const user_ids = [];
            const user_names = [];
            const comments = [];

            for(i=0;i<post.comments.length;i++){
                let user_id = post.comments[i].user_id;
                user_ids.push(user_id);
            }

            console.log(user_ids);

            for(i=0;i<user_ids.length;i++){
                const usercommentData = await User.findByPk(user_ids[i], { attributes:['username'] });

                const user_name = usercommentData.get({ plain: true });

                user_names.push(user_name);
            }

            console.log(user_names);


            for(i=0;i<postData.comments.length;i++) {
                const comment = {
                    content: postData.comments[i].content,
                    date_created: postData.comments[i].date_created,
                    user_id: postData.comments[i].user_id,
                    user_name: user_names[i].username,
                }

                comments.push(comment);
            }
            
            console.log(comments);

            res.render('postInfo', {
                ...post, comments, loggedIn: req.session.loggedIn
            });
        } else {
            console.log(post);
            res.render('postInfo', {
                ...post, loggedIn: req.session.loggedIn
            });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/create', async (req, res) => {
    try{
        const postData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
    
        console.log(postData);
    
        res.json({ message: 'Post successfully created!' });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.render('createpost', {
            loggedIn: req.session.loggedIn
        });


    } catch (err) {
            res.status(500).json(err);
    }
});

router.put('/update/:id', withAuth, async (req,res) => {
    try{
        const postData = await BlogPost.update({
            title: req.body.title,
            content:req.body.content,
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

router.delete('/:id', withAuth, async (req,res) => {
    try{
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