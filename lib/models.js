/* Models module.
     Consists of:
     1) ClientModel: Keep track of all the IRC client data for a server.
     2) UserModel: Keep track of a user, clients and his usage.
*/


exports.ClientModel = ClientModel;
exports.UserModel = UserModel;


function ClientModel(irc_client, server, nick) {
    this.server = server;
    this.client = irc_client;
    this.nick = nick;
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


function UserModel(passphrase) {
    this.passphrase = passphrase;
    this.clients = [];
    this.locations = [];
}
