/**
 * Module dependencies.
 */

var express = require('express');
var engine = require('ejs-locals');
var flash = require('connect-flash');
// var db = require('./model/db');
var routes = require('./routes');
// var faculty = require('./routes/faculty');
// var student = require('./routes/student');
// var enrollment = require('./routes/enrollments');
// var form = require('./routes/form');
// var evaluate = require('./routes/evaluation');
// var verify = require('./routes/verification');

var http = require('http');
var path = require('path');
var fs = require('fs');

var server = require('./routes/server');

var app = express();

// all environments
app.engine('ejs',engine);

app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({cookie: {maxAge: 60000 * 60 * 24}}));
app.use(flash());
app.use(function(req,res,next){
    res.locals.session = req.session;
    next(); 
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// var checkAuth = function(req,res,next){
//   if(!req.session.userid){
//       req.flash('info','Please login to do that.');
//       res.redirect('/')
//   }else{
//       next();
//   } 
// };

// var checkSession = function(req,res,next){
//   if (req.session.userid!=null){
//     if (req.session.type == "faculty"){
//       res.redirect('/Faculty');
//     } else if (req.session.type == "student"){
//       res.redirect('/Student');  
//     } 
//   } else {
//     next();
//   }
// };

//GENERAL
app.get('/', routes.landingPage);
app.get('/connection', routes.connectionPage);
app.get('/ftp', routes.ftpPage);
app.get('/printer', routes.printerPage);

http.createServer(app).listen(app.get('port'), function(){
  server.startFTPSrv("192.168.0.28","8421");
  console.log('Express server listening on port ' + app.get('port'));
});