var mongoose = require('mongoose');
var Subject = mongoose.model('Subject');

exports.retrieve = function (callback){
    Subject.find({},{},{sort:{subjectName:1}},function (err, k){
        if(k){
            callback (false,k);
        }else{
            callback (true,null);
        }
    });
}

exports.genSubject = function(sub, callback){
    Subject.create(sub,function(err,orgObj){
        if(err){
            callback(err, null);
        }else{
            callback(false, orgObj);
        }
    }); 
}

exports.addSlots = function(data,callback){
    Subject.findOne(data,function(err,found){
        if(found){
            var slots = found.slots +1;
            Subject.update({_id:found._id},{'$set':{slots:slots}},function(err,obj){
                if (obj){
                    callback(false);
                }else{
                    callback(true);
                }
            });
        }else{
            callback(true);
        }
    });
}

exports.updateSubject = function(subjectId, callback){
    Subject.findOne({_id:subjectId},function(err,found){
        if(found){
            var slots = found.slots -1;
            Subject.update({_id:subjectId},{'$set':{slots:slots}},function(err,done){
                if(done){
                    callback(false,done);
                }else{
                    callback(true,null);
                }
            });
        }else{
            callback(true,null);
        }
    })    
}