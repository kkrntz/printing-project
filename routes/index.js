var server = require('./server');
var WiFiControl = require('wifi-control');

exports.landingPage = function (req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      var ftpDetails = {
        "user" : "pi3",
        "hostname" : ipAddress,
        "port" : 21,
        "password" : "raspberry",
        "dest_folder" : "/var/www/pi3"
      };
      res.render('overview', {
        ipAddress : ipAddress ? ipAddress : 'localhost',
        pageName : 'overview',
        network : network,
        wifi : wifi,
        ftpObject : ftpDetails,
        messages: req.flash('info')
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
        res.render('ftp', {
          ipAddress : ipAddress,
          network : network,
          wifi : wifi,
          wifi_networks : wifi_networks,
          pageName : 'ftp',
          messages: req.flash('info')
        })
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
	console.log(wifi_networks);
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
    res.render('printer',{
      ipAddress : ipAddress ? ipAddress : 'localhost',
      pageName : 'printer',
      messages: req.flash('info')
    });
  });
};