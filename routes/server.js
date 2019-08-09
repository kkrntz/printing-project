var wifi = require('node-wifi');
var network = require('network');
var ftpSrv = require('ftp-srv');
var fs = require('fs');

wifi.init();

var ftpServer = null;

exports.startFTPSrv = function(hostname, port){
  if(!ftpServer){
    ftpServer = new ftpSrv (
    {
      url: "ftp://127.0.0.1:2121",
      anonymous: true,
      pasv_url : '127.0.0.1',
      pasv_range: '2000-3000' } );

    ftpServer.on ( 'login', ( {connection, username, password}, resolve, reject ) =>
    {
      console.log(process.cwd());
      if (username === 'root' && password === 'root') {
        console.log("connected");
        // If connected, add a handler to confirm file uploads 
        connection.on('STOR', (error, fileName) => {
          console.log("Error",error);
          if (error) { 
            console.error(`FTP server error: could not receive file ${fileName} for upload ${error}`); 
          } 
          console.info(`FTP server: upload successfully received - ${fileName}`); 
        }); 
        resolve ( {root : process.cwd(), cwd : '\\' } ); 
      } else { 
        reject(new Error('Unable to authenticate with FTP server: bad username or password')); 
      } 

    });

    ftpServer.on ( 'client-error', (connection, context, error) =>
    {
      console.log ( 'connection: ' , connection );
      console.log ( 'context: ' , context );
      console.log ( 'error: ' , error );
    });

    ftpServer.listen(); 
  }
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