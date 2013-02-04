var irc = require('irc');
var models = require('./models.js');


exports.client_models = {};


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
    var model = null;
    
    client.addListener('registered', function(message) {
	model = new models.ClientModel(client, message.server, nick);

	for(var x in message.args) {
	    model.update_server_log(message.args[x]);
	}

	server = message.server;
	nick = message.args[0];
	this.client_models[model.client_id] = model;
    });

    client.addListener('motd', function(message) {
	model.update_server_log(message);
    });

    client.addListener('names', function(channel, nicks) {
	model.update_channel_log(
	    'Active users: ' + Object.keys(nicks).join(', '), channel);
    });

    client.addListener('topic', function(channel, topic, nick, message) {
	model.update_channel_log(
	    'Topic set by ' + nick + ': ' + topic, channel);
    });

    client.addListener('join', function(channel, nick, message) {
	model.update_channel_log(nick + ' has joined the channel', channel);
    });

    client.addListener('part', function(channel, nick, reason, message) {
	model.update_channel_log(
	    nick + ' has left the channel', channel);
    });

    client.addListener('quit', function(nick, reason, channels, message) {
	for(var x in message.args) {
	    model.update_channel_log(
		nick + ' has quit (' + reason + ')' , channel);
	}
    });

    client.addListener('kick', function(channel, nick, by, reason, message) {
	model.update_channel_log(
	    nick + ' has been kicked by ' + by + '(' + reason + ')', channel);
    });

    client.addListener('kill', function(nick, reason, channels, message) {
	// TODO: Kills are not being logged.
	console.log(nick, reason, channels, nessage);
    });

    client.addListener('message#', function (nick, channel, text, message) {
	model.update_channel_log(nick + ': ' + text, channel);
    });

    client.addListener('pm', function (nick, text, message) {
	model.update_channel_log(text, nick);
    });

    client.addListener('invite', function (channel, from, message) {
	model.update_channel_log(
	    'You have been invited to join ' + channel, from);
    });

    client.addListener('+mode', function (channel, by, mode,
					  argument, message) {
	// TODO: mode changes aren't being logged.
	console.log(channel, by, mode, argument, message);
    });

    client.addListener('-mode', function (channel, by, mode,
					  argument, message) {
	// TODO: mode changes aren't being logged.
	console.log(channel, by, mode, argument, message);
    });

    client.addListener('error', function (message) {
	model.update_server_log(message);
    });
}


this.create_new_client('127.0.0.1', 'testclient', {channels: ['#test', '#test2'], debug: true});
// this.create_new_client('127.0.0.1', 'testclient2', {channels: ['#test'], debug: true});
