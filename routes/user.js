// Consists of all the user releted controllers.

exports.login = function(req, res){
  res.render('login', {'title': 'Login'});
};
