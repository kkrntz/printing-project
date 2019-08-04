var mongoose = require('mongoose');
var Notif = mongoose.model('Notif');

exports.find = function(studentID,callback){
	Notif.find(studentID, function(err,accountabilities){
		if (accountabilities){
			callback(false,accountabilities);
		} else {
			callback(true,null);
		}
	})
}