var mongoose = require('mongoose');
var University = mongoose.model('University');

exports.getSched = function(callback){
	var date = new Date(),
		month = date.getMonth();
		day = date.getDate();
	University.findOne({month:month,day:day}, function(err,sched){
		if (sched){
			callback(sched.period,sched.year,sched.ffa,sched.confirm);
		} else {
			callback(null,null,null,null);
		}
	})
}