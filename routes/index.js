var server = require('./server');
var WiFiControl = require('wifi-control');

var path = "./public/files/";
var dir_default = "/var/www/";
exports.landingPage = function (req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      
      server.getCurrentCredentials(function(creds){
        server.getCurrentDirectory(function(dir){
          var ftpDetails = {
            "user" : creds.user,
            "hostname" : ipAddress,
            "port" : 21,
            "password" : creds.password,
            "dest_folder" : dir.replace(creds.user + '/', '')
          };
          res.render('overview', {
            ipAddress : ipAddress ? ipAddress : 'localhost',
            pageName : 'overview',
            network : network,
            wifi : wifi,
            ftpObject : ftpDetails,
            messages: req.flash('info')
          });
        });
      });
    })
  });
};

exports.ftpPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      server.getWifiConnections(function(wifi_networks){
        var ifaceState = WiFiControl.getIfaceState();
        if(ifaceState.connection != 'connected'){
          wifi = null;
        }
        server.getCurrentCredentials(function(creds){
          var user_val = creds ? creds.user : '';
          server.getCurrentDirectory(function(dir){
            server.getCurrentFileTypes(function(types){
              res.render('ftp', {
                ipAddress : ipAddress,
                network : network,
                wifi : wifi,
                wifi_networks : wifi_networks,
                pageName : 'ftp',
                user: creds.user,
                password : creds? creds.password : '',
                directory : dir.replace(creds.user + '/', ''),
                jpg : types.indexOf('jpg') > -1 ? 'on' : '',
                png : types.indexOf('png') > -1 ? 'on' : '',
                messages: req.flash('info')
              });
            });
          });
          
        });
      });
    });
  });
};

exports.connectionPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      server.getWifiConnections(function(wifi_networks){
        var ifaceState = WiFiControl.getIfaceState();
        if(ifaceState.connection != 'connected'){
          wifi = null;
        }
	console.log(network);
        res.render('connection', {
          ipAddress : ipAddress,
          network : network,
          wifi : wifi,
          wifi_networks : wifi_networks,
          pageName : 'connection',
          messages: req.flash('info')
        })
      });
    });
  });
};

exports.printerPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      server.getWifiConnections(function(wifi_networks){
        var ifaceState = WiFiControl.getIfaceState();
        if(ifaceState.connection != 'connected'){
          wifi = null;
        }
        res.render('printer', {
          ipAddress : ipAddress,
          network : network,
          pageName : 'printer',
          messages: req.flash('info')
        })
      });
    });
  });
};