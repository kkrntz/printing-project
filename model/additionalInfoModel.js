var mongoose = require('mongoose');
var additionalInfo = mongoose.model('additionalInformation');

exports.addAdditionalInformation = function(data, studentId, callback){
	//************** change this to update!!!!!!
			additionalInfo.update({
				studentId: studentId
			}, {
				'$set': data
			}, function(err,numRows){});
}

exports.addForm2 = function(data, studentId, callback){
	//************** change this to update!!!!!!
			additionalInfo.update({
				studentId: studentId
			}, {
				'$set': data
			}, function(err,numRows){});
}

/*additionalInfo.create(data, function(err, ok){ //************** change this to update!!!!!!
		if(err){
			callback(true, false);
		}
		else if(!err){
			callback(false, true);
		}
	})*/

exports.getForm1 = function(studentId, callback){
	additionalInfo.findOne({studentId: studentId}, function(err, obj){
		if(!obj){
			callback(false);
		}
		else {
			callback(true, obj);
		}
	})
}
