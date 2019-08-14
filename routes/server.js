var wifi = require('node-wifi');
var network = require('network');
var ftpSrv = require('ftp-srv');
var bunyan = require('bunyan')
var fs = require('fs');

wifi.init();

var ftpServer = null;

exports.startFTPSrv = function(hostname, port){
  ftpServer = new ftpSrv({
    log: bunyan.createLogger({name: 'test', level: 'trace'}),
    url: 'ftp://' + hostname + ':' + port,
    pasv_url: hostname,
    pasv_min: 8881,
    greeting: ['Welcome', 'to', 'the', 'jungle!'],
    file_format: 'ls',
    anonymous: 'kkrntz'
  });
  ftpServer.on('login', ({username, password}, resolve, reject) => {
    if (username === 'test' && password === 'test' || username === 'kkrntz') {
      resolve({root: '/'});
    } else reject('Bad username or password');
  });
  ftpServer.listen();
}

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
        if (err2) {
          callback(interface, null);
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