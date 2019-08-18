var server = require('./server');

exports.landingPage = function (req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      var ftpDetails = {
        "user" : "pi",
        "hostname" : ipAddress,
        "port" : 21,
        "password" : "raspberry",
        "dest_folder" : "~"
      };
      res.render('overview', {
        ipAddress : ipAddress ? ipAddress : 'localhost',
        pageName : 'overview',
        network : network,
        wifi : wifi,
        ftpObject : ftpDetails
      });
    })
  });
};

exports.ftpPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    res.render('ftp',{
      ipAddress : ipAddress ? ipAddress : 'localhost',
      pageName : 'ftp'
    });
  });
};

exports.connectionPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    res.render('connection',{
      ipAddress : ipAddress ? ipAddress : 'localhost',
      pageName : 'connection'
    });
  });
};

exports.printerPage = function(req, res){
  server.getServerAddress(function(ipAddress){
    res.render('printer',{
      ipAddress : ipAddress ? ipAddress : 'localhost',
      pageName : 'printer'
    });
  });
};