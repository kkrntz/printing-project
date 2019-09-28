var wifi = require('node-wifi');
var network = require('network');
var ftpSrv = require('ftp-srv');
var fs = require('fs');
var WiFiControl = require('wifi-control');
var fs = require("fs");
var shell = require("shelljs");

var path = "./public/files/";
var dir_default = "/var/www/";

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

exports.getCurrentCredentials = function(callback){
  fs.readFile(path + 'user.txt', function(err, buff){
    if(err){
      callback(null);
    }else{
      var cred = buff.toString().trim().split(":");

      callback({
        "user" : cred[0],
        "password" : cred[1]
      })
    }
  });
};

exports.getCurrentDirectory = function(callback){
  fs.readFile(path + 'path.txt', function(err, buff){
    if (err){
      callback(null);
    }else{
      callback(buff.toString().trim().replace(dir_default, ""));
    }
  })
};

exports.getCurrentFileTypes = function(callback){
  fs.readFile(path + 'file.txt', function(err, buff){
    if (err){
      callback(null);
    }else{
      callback(buff.toString().trim().split('\n'));
    }
  })
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

exports.saveFtp = function(req, res){
  // console.log(req.body);
  // if(shell.mkdir(dir_default + '$USER/' + req.body.dest).code !== 0){
  //   console.log(err);
  //   res.redirect('/ftp');
  // }

  // if(shell.exec("htpasswd -bcd /etc/ftpd.passwd " + req.body.user + " " + req.body.password + "").code !== 0){
  //   console.log(err);
  //   res.redirect('/ftp');
  // }

  // getCurrentDirectory(function(dir){
    // if(shell.exec("sed -i 's/local_root=" + dir_default.replace('/','\/') + '$USER\/' + dir.replace(req.body.user+'/', '') + "/local_root=" + 
    //    dir_default.replace('/','\/') + '$USER\/' + req.body.dest + "/g' /etc/vsftpd.conf").code !== 0){
    //   console.log(err);
    //   res.redirect('/ftp');
    // }
  // });
  fs.writeFile(path + "user.txt", req.body.user + ":" + req.body.password, (err) => {
    if (err){ 
      console.log(err);
      res.redirect('/ftp');
    }
    fs.writeFile(path + "path.txt", dir_default + req.body.user + '/' + req.body.dest, (err) => {
      if (err){ 
        console.log(err);
      }

      var file_types = "";
      if(req.body.jpg){
        file_types += "jpg\nJPEG\nJPG\n";
      }

      if(req.body.png){
        file_types += "png\nPNG\n";
      }
      fs.writeFile(path + "file.txt", file_types, (err) => {
        if (err){ 
          console.log(err);
        }
        req.flash('info','Update successful.');
        res.redirect('/');
      });
    });
  });
};
