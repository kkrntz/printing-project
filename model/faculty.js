var mongoose = require('mongoose');
var Faculty = mongoose.model('Faculty');

exports.authenticate = function(userName,password,callback){
    Faculty.findOne({
        userName: userName,
        password: password
    },function(err,result){
        callback(result);
    });
};

exports.getData = function(userid,callback){
    Faculty.findOne({
        _id: userid
    },function(err,found){
        callback(found);
    });
};

exports.findPassword = function(username,callback){
    exports.getUser(username,function(err,existingUser){
        if(existingUser){
            callback(false,existingUser)
        }else{
            callback(true,false);
        }
    });
};

exports.replacePassword = function(username, newPassword, callback){
    exports.getUser(username,function(err,existingUser){
        if(existingUser){
            Faculty.update({userName:username}, {
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
        }else if(err){
            callback(false)
        }
    })
}

exports.updateUser = function(userId,data,callback){
    Faculty.update({
        _id: userId
    },{
        '$set': {
            password:data.password,
            secQ: data.secQ,
            answer: data.answer,
        }
    },callback);
};

///////////////////////////////////////////////////////////////////////////////////

exports.addUser = function(faculty,callback){
    var name = faculty.name.trim(),
        userName = faculty.userName.trim(),
        password = faculty.password.trim();
    if(!name || !userName || !password){
        callback('Please fill in all fields.')
    }else{        
        exports.getUser(userName,function(err,existingUser){
            if(existingUser){
                callback('UserName is already taken.')
            }else{
                Faculty.create(faculty,function(err,userObj){
                    if(err){
                        callback('Unexpected error occured while saving data.');
                    }else{
                        callback(null,userObj);
                    }
                });
            }
        });
    }
};