var mongoose = require('mongoose');
var Student = mongoose.model('Student');


exports.authenticate = function(username,password,callback){
    var user = {
        studentNo: username,
        password: password
    };
    Student.findOne(user,function(err,userObj){
        if(userObj){
            callback(true,userObj);
        }else{
            callback(false);
        }
    });
};

exports.getStudent = function(studentNo, callback){
    Student.find({studentNo:studentNo}, function (err, obj){
        if (obj){
            callback(false,obj);
        }else{
            callback(true);
        }
    });
}

exports.findPassword = function(studentNumber,password,callback){
    Student.findOne({studentNo: studentNumber,password:password},function(err,existingUser){
        if(existingUser){
            callback(true,existingUser)
        }else{
            callback(false);
        }
    });
};

exports.replacePassword = function(studentNumber, oldPassword,newPassword, callback){
    Student.findOne({studentNo:studentNumber,password:oldPassword},function(err,existingUser){
        if(existingUser){
            Student.update({studentNo:studentNumber,password:oldPassword}, {
                '$set':{
                    password:newPassword
                }
            },function(err){
                if (err){
                    callback(err)
                }else{
                    callback(false)
                };
            })
        }else{
            callback(false)
        }
    })
}

exports.replaceforgetPass = function(studentNumber, newQuestion,newAnswer, callback){
    Student.findOne({studentNo:studentNumber},function(err,existingUser){
        if(existingUser){
            Student.update({studentNo:studentNumber}, {
                '$set':{
                    
                    question:newQuestion,
                    answer:newAnswer
                }
            },function(err){
                if (err){
                    callback(err)
                }else{
                    callback(false)
                };
            })
        }else{
            callback(false)
        }
    })
}

exports.getAllStudents = function(callback){
    Student.find({},{},{sort:{name:1}},function (err, found){
        if (found){
            callback(false,found);
        }else{
            callback(err,null);
        }
    });
}



exports.genStudent = function(stud, callback){
    Student.create(stud,function(err,orgObj){
        if(err){
            callback(err, null);
        }else{
            callback(false, orgObj);
        }
    }); 
}

