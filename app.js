
/**
 * Module dependencies.
 */

var express = require('express')
  , user = require('./routes/user')
  , logs = require('./routes/logs')
  , http = require('http')
  , path = require('path')
  , irc_lib = require('./lib/irc_lib');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', user.login);
app.get('/user/login', user.login);
app.post('/user/new', user.login);

http.createServer(app).listen(app.get('port'), function(){
    irc_lib.create_new_client('127.0.0.1', 'testclient', {
	channels: ['#test', '#test2'],
	debug: true
    });
});
