const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  question: String,
  answers: {
    type: Array,
    default: [],
  },
  correct_answer : {
    type : String ,
    default : "" ,
  },
  delete : {
    type : Boolean ,
    default : false ,
  }
});

const Assignment = mongoose.model("Assignment" , assignmentSchema , "assignment") ;
module.exports = Assignment ;