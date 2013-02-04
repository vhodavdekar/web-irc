var irc_lib = require('../lib/irc_lib');

exports.get_logs = function(req, res){
  res.render('index', { title: 'Express' });
};
