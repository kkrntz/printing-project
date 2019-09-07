var wifi = require('node-wifi');
var network = require('network');
var ftpSrv = require('ftp-srv');
var fs = require('fs');
var WiFiControl = require('wifi-control');

wifi.init();
WiFiControl.init({
  debug: true
});

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
      wifi.getCurrentConnections(function(err2, networks) {
        if (err2) {
          callback(null, null);
        } else {
          if(networks.length > 0){
            callback(null, networks[0]);
          }else{
            callback(null, null);
          }
        }
      });
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
};

exports.getWifiConnections = function(callback){
  wifi.scan(function(err, networks) {
    if (err) {
      console.log(err);
      callback([]);
    } else {
      callback(networks);
    }
  });
};

exports.connect = function(req, res){
  WiFiControl.connectToAP({ ssid: req.body.ssid, password: req.body.password }, function(err){
    if(err){
      req.flash('alert','Unable to connect.');
      // console.log(err);
      res.redirect('/connection');
    }else{
      req.flash('info','Connection successful.');
      res.redirect('/');
    }
  })
};