const withAuth = (req, res, next) => {
  console.log(req.session)
  console.log('inside withAuth')
  if (!req.session.loggedIn) {
    console.log('withAuth: not logged in')
    res.redirect('/login');
  } else {
    console.log('withAuth: logged in')
    next();
  }
};

module.exports = withAuth;