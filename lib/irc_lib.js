var irc = require('irc');
var models = require('./models.js');


exports.create_new_client = function(server, nick, options) {
    /*
      This function need to be called whenever a new client is created.
      It takes care of keeping track of all our different clients
      using models.js. It also takes care of setting up all the necessary
      callbacks needed.

      Args:
        server: irc server to be used.
        nick: nick name to use for the client.
        options: refer to https://node-irc.readthedocs.org/en/latest/API.html
	  for more.
    */
    var client = new irc.Client(server, nick, options);

    client.addListener('registered', function(message) {
	//TODO: Change this to a dict of server + nick.
	models.clients.push(client);
	console.log('client has been registered');
    });

    client.addListener('names', function(channel, nicks) {
	console.log(channel);
	console.log(nicks);
    });

    client.addListener('topic', function(channel, topic, nick, message) {
	console.log(channel);
	console.log(nicks);
    });

    client.addListener('join', function(channel, nick, message) {
	console.log(channel);
	console.log(nick);
    });

    client.addListener('part', function(channel, nick, reason, message) {
	console.log(channel);
	console.log(nick);
    });

    client.addListener('quit', function(nick, reason, channels, message) {
	console.log(channels);
	console.log(nick);
    });

    client.addListener('kick', function(channel, nick, by, reason, message) {
	console.log(channel);
	console.log(nicks);
    });

    client.addListener('kill', function(nick, reason, channels, message) {
	console.log(channel);
	console.log(nicks);
    });

    client.addListener('message#', function (nick, to, text, message) {
	console.log(nick);
	console.log(to);
	console.log(text);
    });

    client.addListener('pm', function (nick, text, message) {
	console.log(nick);
    });

    client.addListener('invite', function (channel, from, message) {
	console.log(channel);
	console.log(to);
    });

    client.addListener('+mode', function (channel, by, mode,
					  argument, message) {
	console.log(channel);
	console.log(to);
    });

    client.addListener('-mode', function (channel, by, mode,
					  argument, message) {
	console.log(channel);
	console.log(to);
    });

    client.addListener('error', function (message) {
	console.log(message);
    });
}


this.create_new_client('127.0.0.1', 'testclient', {channels: ['#test'], debug: true});
// this.create_new_client('127.0.0.1', 'testclient2', {channels: ['#test'], debug: true});
