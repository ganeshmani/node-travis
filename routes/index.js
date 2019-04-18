
module.exports = function(app,passport){

    
    app.get('/',isLoggedIn,(req,res)=>{
        console.log("req user",req.user);
        res.render('home',{
            user : req.user
        });
    });

    app.get('/login',(req,res) => {
        res.render('login')
    });

    app.post('/login',passport.authenticate('local-login',{
            successRedirect : '/',
            failureRedirect : '/login',
            failureFlash: true
        }
    ));

    app.get('/signup',(req,res) => {
        res.render('signup');
    })

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


        // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
}