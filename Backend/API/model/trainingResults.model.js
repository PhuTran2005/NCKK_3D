const mongoose = require("mongoose");

const trainingResultsSchema = new mongoose.Schema({
  account_id : String ,
  // danh sách câu hỏi .
  answers : {
    type : Array ,
    default : [] ,
  } ,
  score: Number,
  time: {
    type: Date,
    default: Date.now,
  },
  delete : {
    type: Boolean,
    default: false
  } ,
});

const TrainingResults = mongoose.model(
  "TrainingResults",
  trainingResultsSchema,
  "training_results"
);
module.exports = TrainingResults;
