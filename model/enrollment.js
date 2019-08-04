var mongoose = require('mongoose');
var Enrollment = mongoose.model('Enrollment');

exports.getStudentEnrollments = function(studentNum,callback){
    Enrollment.find({studentNo : studentNum, status: 'Enrolled'}, function(err,enrollments){
        if(enrollments){
            callback(true,enrollments);
        }
        else{
            callback(false);
        }
    }); 
};

exports.getToSubmit = function (name, callback){
    exports.getDate(function (academicYear, semester){
        name.academicYear = academicYear;
        name.semester = semester;
        name.initialGrade = "";
        Enrollment.find(name,function(err, data){
            if (data){
                callback(false,data);
            }else{
                callback(true,false);
            }
        });
    });
}

exports.find = function (data, callback){
    exports.getDate(function (academicYear, semester){
        data.academicYear = academicYear;
        data.semester = semester;
        Enrollment.find(data, function (err, k){
            if(k){
                callback (k);
            }else{
                callback (null);
            }
        })
    });
}

exports.updateEnrollment = function(data,callback){
    Enrollment.update(data,{'$set':{isEvaluated: true}},function(err,done){
        if (err){
            callback(err,null);
        }else{
            callback(false,done);
        }
    });
}

exports.getDate = function(callback){
    var academicYear, semester;
    var d = new Date().getFullYear();
    var n = d+1;
    var p = d-1;
    var m = new Date().getMonth();
    if (m>=5 && m<=11){
        academicYear = d.toString() + "-" + n.toString();
        semester = 1;
    }else{
        academicYear = p.toString() + "-" + d.toString();
        semester = 2;
    }
    callback(academicYear, semester);
}

exports.getEnlistment = function(studentNum, callback){
    var results =[];
    exports.getDate(function (academicYear,sem){
        Enrollment.find({academicYear:academicYear,semester:sem,studentNo : studentNum, status: 'Enlisted'}, function(err,enrollments){
            if(enrollments){
                enrollments.forEach(function(enroll){
                    results.push(enroll);
                });
                Enrollment.find({academicYear:academicYear,semester:sem,studentNo : studentNum, status: 'Waitlist'}, function(err2,enrollments2){
                    if(enrollments2){
                        enrollments2.forEach(function(enroll2){
                            results.push(enroll2);
                        });
                    }   
                });
                results.sort(function(a,b){
                    var nameA=a.subjectName.toLowerCase(),nameB=b.subjectName.toLowerCase();
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    return 0
                });
                callback(false,results); 
            }
            else{
                callback(true,null);
            }
        });
    });
}

exports.getConfirmed = function(studentNum, callback){
    exports.getDate(function (academicYear,sem){
        Enrollment.find({academicYear:academicYear,semester:sem,studentNo : studentNum, status: 'Confirmed'}, function(err,enrollments){
            if(enrollments){
                enrollments.sort(function(a,b){
                    var nameA=a.subjectName.toLowerCase(),nameB=b.subjectName.toLowerCase();
                    if(nameA < nameB)
                        return -1
                    if(nameA > nameB)
                        return 1
                    return 0
                });
                callback(false,enrollments); 
            }
            else{
                callback(true,null);
            }
        });
    });
}

exports.deleteSubject = function(enrollId,callback){
    Enrollment.remove({_id:mongoose.Types.ObjectId(enrollId)},function(err,done){
        if(err){
            callback(err);
        }
        callback(false);
    })
}

exports.addEnrollment = function(data,callback){
    Enrollment.create(data,function(err,obj){
        if(obj){
            callback(false,obj);
        }else{
            callback(true,null);
        }
    });
}

exports.getConfirmation = function(studentNum, callback){
    var results =[];
    Enrollment.find({studentNo : studentNum, status: 'Enlisted'}, function(err,enrollments){
        if(enrollments){
            enrollments.forEach(function(enroll){
                results.push(enroll);
            })
            Enrollment.find({studentNo : studentNum, status: 'Waitlist'}, function(err2,enrollments2){
                if(enrollments2){
                    enrollments2.forEach(function(enroll2){
                        results.push(enroll2);
                    })
                    Enrollment.find({studentNo : studentNum, status: 'Confirmed'}, function(err2,enrollments3){
                        if(enrollments3){
                            enrollments3.forEach(function(enroll3){
                                results.push(enroll3);
                            })
                        }
                        results.sort(function(a,b){
                            var nameA=a.subjectName.toLowerCase(),nameB=b.subjectName.toLowerCase();
                            if(nameA < nameB)
                                return -1
                            if(nameA > nameB)
                                return 1
                            return 0
                        });
                        callback(true,results);    
                    })
                }
            })
            
        }
        else{
            callback(false);
        }
    });
}

exports.confirmSubject = function(enrollId, callback){
    Enrollment.update({
        _id:mongoose.Types.ObjectId(enrollId)
    },{
        '$set':{status:'Confirmed'}
    },function(err,done){
        if(done){
            callback(false,done);
        }else{
            callback(err,null);
        }
    });
}

exports.unconfirmSubject = function(enrollId, callback){
    Enrollment.update({
        _id:mongoose.Types.ObjectId(enrollId)
    },{
        '$set':{status:'Enlisted'}
    },function(err,done){
        if(done){
            callback(false,done);
        }else{
            callback(err,null);
        }
    }); 
}

exports.addGradeFac = function(data, grades, callback){   
    Enrollment.find(data, 
        function(err,enrollment){
            if(enrollment){
                for(var i = 0; i < enrollment.length; i++){
                    Enrollment.update({
                        studentNo: enrollment[i].studentNo,
                        facultyName: data.facultyName,
                        subjectName: data.subjectName,
                        section: data.section, 
                        academicYear: data.academicYear,
                        type: data.type,
                        semester: data.semester,
                        initialGrade: ''
                    },{initialGrade: grades[i]}, function (err, numAffected){
                        if (numAffected)
                            console.log("Grades Updated!");
                    });
                }
                callback(null,enrollment);
            } else {
                callback(true,null);
            }
    });
}

exports.completeGradeFac = function(facultyName,grades,students,callback){
    var counter = 0;
    students.forEach(function (stud){
        Enrollment.update({_id:stud._id},{ 
            '$set':{
                    completionGrade: grades[counter]
                    }
        },function(d){
            console.log("Grade changed");
        });
        counter ++;
    });
    callback(null,grades);
}

exports.retrieve = function (data, callback){
    Enrollment.find(data,{},{sort:{academicYear:1,semester:1,subjectName:1,type:1,sectionNum:1}}, function (err, k){
        if(k){
            callback (true, k);
        }else{
            callback (false,null);
        }
    })
}

exports.uploadSyllabus = function (data, newPath, counter, callback){
    exports.retrieve(data, function (err,obj){
        if (obj){
            var count = 0;
            obj.forEach(function (object){
                if (count == counter){
                    Enrollment.update({
                        facultyName:object.facultyName,
                        academicYear:object.academicYear,
                        semester:object.semester,
                        subjectName:object.subjectName,
                        type: object.type,
                        units: object.units,
                    },{
                        '$set':{
                            syllabus: newPath
                        }
                    },function(d){
                        console.log("syllabus uploaded");
                    });
                }
                count ++;
            });
            callback(false,"Upload Successfull");
        } else {
            callback("Upload failed", null);
        }
    });
}

exports.genEnrollment = function(enroll, callback){
    Enrollment.create(enroll,function(err,orgObj){
        if(err){
            callback(err, null);
        }else{
            callback(false, orgObj);
        }
    }); 
}