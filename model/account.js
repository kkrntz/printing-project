var mongoose = require('mongoose');
var Account = mongoose.model('Account');

exports.findInfo = function(studentID,callback){
	Account.find(studentID, function(err,accountabilities){
		if (accountabilities){
			callback(false,accountabilities);
		} else {
			callback(true,null);
		}
	})
}