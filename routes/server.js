var wifi = require('node-wifi');
var network = require('network');

wifi.init();

exports.getServerAddress = function(callback){
  network.get_private_ip(function(err, ip){
    if(err){
      callback(false);
    }else{
      callback(ip);
    }
  })
};

exports.getCurrentConnection = function(callback){
  network.get_active_interface(function(err, interface){
    if(err){
      callback(err);
    }else{
      wifi.getCurrentConnections(function(err2, networks) {
        console.log(interface);
        console.log(networks);
        if (err2) {
          callback(false);
        } else {
          if(networks.length > 0){
            callback(interface, networks[0]);
          }else{
            callback(interface, null);
          }
        }
      });
    }
  });
}