var ip = require('ip');

exports.getServerAddress = function(callback){
    callback(ip.address());
};