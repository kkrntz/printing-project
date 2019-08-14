var server = require('./server');

exports.landingPage = function (req, res){
  server.getServerAddress(function(ipAddress){
    server.getCurrentConnection(function(network, wifi){
      var ftpObject = {
        "port" : 8881,
        "user" : "test",
        "password" : "test",
        "directory" : "/"
      }
      res.render('overview', {
        ipAddress : ipAddress ? ipAddress : 'localhost',
        pageName : 'overview',
        network : network,
        wifi : wifi,
        ftpObject : ftpObject
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