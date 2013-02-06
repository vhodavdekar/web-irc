// Consists of all the user releted controllers.

exports.login = function(req, res) {
    res.render('login', {'title': 'Login'});
};


exports.new_user = function(req, res) {
    //TODO: Add validation here.
    req.session.logged_id = true;
    res.send('Login successful');
};
