// Model file for keep track of all the IRC client data.


exports.clients = {};


exports.create_client_model = function(client, server, nick) {
    var client_id =  [server, nick].join('#');
    var client_model = {
	server: server,
	client_ref: client,
	passphrase: null,
	server_output: [],
	channels: {},
    };
    this.clients[client_id] = client_model;
}


exports.get_client_model = function(server, nick) {
    console.log('Clients available:');
    console.log(Object.keys(this.clients));
    return this.clients[[server, nick].join('#')];
}


exports.update_log = function(message, object_ref) {
    object_ref.push(message);
    console.log(object_ref);
    console.log(this.clients);
}

exports.update_channel_log = function(model, channel, message) {
    if(!(channel in model.channels)) {
	model.channels[channel] = [];
    }
    this.update_log(message, model.channels[channel]);
}
