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


router.post('/create', async (req, res) => {
    try{
        const postData = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });
    
        console.log(postData);
    
        res.json({ message: 'Post successfully created!' });

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