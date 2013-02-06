var crypto = require('crypto');
var models = require('./models');


exports.users = {};


exports.get_md5sum = function(passphrase_str) {
    var hash = crypto.createHash('md5');
    hash.update(passphrase_str);
    return hash.digest('hex');
}


exports.add_user = function(passphrase_str) {
    var md5sum = this.get_md5sum(passphrase_str);
    this.users[md5sum] = new models.UserModel(md5sum);
}


exports.check_user = function(passphrase_str) {
    if(this.get_md5sum(passphrase_str) in this.users) {
        return true;
    }
    else {
        return false;
    }
}


exports.validate_passphrase = function(passphrase_str) {
    if(passphrase_str.length == 0) {
        return 'Empty passphrases are not permitted';
    }
    else if(this.check_user(passphrase_str)) {
        return 'Passphrase already in use';
    }
    else {
        return false;
    }
}
