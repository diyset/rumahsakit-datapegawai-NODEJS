var authController = require('../controllers/authcontroller.js');

module.exports = function(app,passport){

app.get('/signup', authController.signup);

app.get('/signin', authController.signin);

app.post('/signup', passport.authenticate('local-signup',  { successRedirect: '/index',
                                                    failureRedirect: '/signup'}
                                                    ));

app.get('/logout',authController.logout);

//Routes for Index

app.get('/' ,isLoggedIn,authController.index);
app.get('/index',isLoggedIn,authController.index);

app.post('/signin', passport.authenticate('local-signin',  { successRedirect: '/index',
                                                    failureRedirect: '/signin'}
                                                    ));
// app.get('/login',authController.login);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/signin');
}


}