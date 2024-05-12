const mongoose = require('mongoose');
const InterviewTable  =  new mongoose.Schema({
    username:String,
    status:String,
    feedback : String,
    rating : Number
});
module.exports = mongoose.model('InterviewTable',InterviewTable);