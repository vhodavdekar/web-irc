// Models module. Consists of ClientModel to get track of all the client data.


exports.ClientModel = ClientModel;


function ClientModel(irc_client, server, nick, passwd) {
    this.server = server;
    this.client = irc_client;
    this.nick = nick;
    this.passphrase = passwd;
    this.client_id = server + '#' + nick;
    this.output = [];
    this.channels = {};
}

ClientModel.prototype.update_log = function(message, ref) {
    ref.push(message);
    console.log(ref);
}

ClientModel.prototype.update_channel_log = function(message, channel) {
    if(!(channel in this.channels)) {
	this.channels[channel] = [];
    }
    this.update_log(message, this.channels[channel]);
}

ClientModel.prototype.update_server_log = function(message) {
    this.update_log(message, this.output);
}
