var mongoose = require('mongoose');

var Evaluation = mongoose.model('Evaluation');

exports.createEvaluations = function(data,callback){
    Evaluation.create(data,function(err){
    });
}
