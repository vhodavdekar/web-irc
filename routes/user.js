// Consists of all the user related controllers.


var user_lib = require('../lib/user_lib');


exports.login = function(req, res) {
    if(req.query.error == 'unknown') {
        var error = 'Client with that passphrase does not exist.';
    }
    else {
        var error = '';
    }

    res.render('login', {
        title: 'Login',
        error: error,
    });
};


exports.authenticate = function(req, res) {
    if(user_lib.check_user(req.body.passphrase)) {
        res.send('Login successful');
    }
    else {
        res.redirect('/user/login?error=unknown');
    }
};


exports.new_user = function(req, res) {
    if(req.query.error == 'exists') {
        var error = 'Sorry, that passphrase is taken.';
    }
    else {
        var error = '';
    }

    res.render('new_user', {
        title: 'Sign Up',
        error: error,
    });
};


exports.register = function(req, res) {
    var validate = user_lib.validate_passphrase(req.body.passphrase);
    if(validate) {
        res.redirect('/user/new?error=exists');
    }
    else {
        user_lib.add_user(req.body.passphrase);
        res.send('registration was successful');
    }

};
