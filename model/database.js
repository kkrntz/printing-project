var mongoose = require('mongoose');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

/*
var divisionSchema = new mongoose.Schema({
    divName: String,
    position: String,
    facultyName: String,
});
*/

var studentSchema = new mongoose.Schema({
    studentNo: Number,
    name: String,
    password: String,
    course : String,
    question: String,
    answer: String,
    requiredUnits: Number,
//    year: Number,
//    gender: String
});

var facultySchema = new mongoose.Schema({
    userName: String,
    password: String,
    name: String,
    gender: String,
    secQ: String,
    answer: String
    });
    
var subjectSchema = new mongoose.Schema({
    sectionNum: Number,
    units: Number,
    facultyName: String,
    subjectName: String,
    type: String,
    schedule: String,
    room: String,
    semester: String,
    syllabus: String,
    span: Number,
    startTime: Number,
    startDay: Number,
    endDay: Number,
    campus:String,
    slots:{type:Number, default:30},
    //divId: mongoose.Schema.ObjectId,
    });
        
var enrollmentSchema = new mongoose.Schema({
    studentNo: Number,
    facultyName: String,
    subjectName: String,
    sectionNum: Number,
    type: String,
    units: Number,
    schedule: String,
    room: String,
    academicYear: String,
    semester: String,
    syllabus: String,
    span: Number,
    startTime: Number,
    startDay: Number,
    endDay: Number,
    initialGrade: String,
    completeGrade: String,
    campus: String,
    status: String,
    slot:Number,
    isEvaluated: {type: Boolean,default: false}
    });

var evaluationSchema = new mongoose.Schema({
    enrollmentID: mongoose.Schema.ObjectId,
    answersto1A: Array,
    answersto1B: Array,
    answersto1C:Array,
    answersto2:Array,
    answersto3:Array
})

var additionalInformationSchema = new mongoose.Schema({
	studentId: Number,
	studentType: String,
	regStatus: String,
	yrLevel: String,
	gradStat: String,
	foreign: String,
	degLevel: String,
	employed: String,
	employerName: {type: String, default: null},
	employerAddress: {type: String, default: null},
	employerZipCode: {type: String, default: null},
	employerPhone: {type: String, default: null},
	citizenshipCountry: String,
	annualFamilyGO: String,
	annualPersonalGO: String,
	residentPhil: String,
	fatherName: {type: String, default: null},
	fatherOccupation: {type: String, default: null},
	motherName: {type: String, default: null},
	motherOccupation: {type: String, default: null},
	recipientName: String,
	recepientOccupation: {type: String, default: null},
	recepientBrgy: String,
	recepientZipCode: String,
	recepientPhone: String,
	guardianName: String,
	guardianOccupation: {type: String, default: null},
	guardianHouseNumber: {type: String, default: null},
	guardianStreet: {type: String, default: null},
	guardianStreet: {type: String, default: null},
	guardianBrgy: String,
	guardianCity: String,
	guardianPhone: {type: String, default: null},
	provincialHouseNumber: {type: String, default: null},
	provincialStreet: {type: String, default: null},
	provincialBrgy: {type: String, default: null},
	provincialCity: {type: String, default: null},
	provincialPhone: {type: String, default: null},
	housingType: String,
	brgy: String,
	city: String,
	birthdate: String,
	birthPlace: String,
	emailAddress: String,
	housingTypeUPV: String,
	houseNumberUPV: String,
	streetUPV: String,
	brgyUPV: String,
	cityUPV: String,
	phoneNumberUPV: String
});
    
var accountSchema = new mongoose.Schema({
    studentID: {type: Number},
    unit: {type: Number},
    accountability: String,
    detail: String,
    amount: {type: Number},
    date: String
});

var notifSchema = new mongoose.Schema({
     //adminID:mongoose.Schema.ObjectId,
    studentID: {type: Number},
    notificationData: String,
    senderLocation: String,
    dateOfNotice: {type: Date, default: Date.now }
});

//var Division = mongoose.model('Division',divisionSchema);
var Student = mongoose.model('Student',studentSchema);
var Faculty = mongoose.model('Faculty',facultySchema);
var Notif = mongoose.model('Notif',notifSchema);
var Account = mongoose.model('Account',accountSchema);
var Subject = mongoose.model('Subject',subjectSchema);
var Evaluation = mongoose.model('Evaluation',evaluationSchema);
var Enrollment = mongoose.model('Enrollment',enrollmentSchema);
var additionalInformation = mongoose.model('additionalInformation', additionalInformationSchema);
mongoose.connect('mongodb://localhost/crs');
