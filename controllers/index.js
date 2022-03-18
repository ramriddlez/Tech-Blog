const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// wild card route
router.get("*", (req, res) => {
    res.redirect("/login");
  });

  
module.exports = router;