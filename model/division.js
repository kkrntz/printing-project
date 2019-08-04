var mongoose = require('mongoose');
var Division = mongoose.model('Division');


exports.getDivision = function(divId,callback){
    Division.findOne({
        _id: divId
    },function(err,found){
        callback(found);
    });
};

exports.genDiv = function(div, callback){
    Division.create(div,function(err,orgObj){
        if(err){
            callback(err, null);
        }else{
            callback(false, orgObj);
        }
    });	
}
