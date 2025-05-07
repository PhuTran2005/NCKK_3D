const Assignment = require("../../../model/assignment.model")

// view all assignments .
module.exports.index = async (req, res) => {
  const assignments = await Assignment.find({
    delete: false,
  });

  res.json(assignments) ;
};

// detail one assignment .
module.exports.detail = async (req, res) => {
  const assignmentId = req.params.assignmentId ;
  const assignment = await Assignment.findById({
    _id : assignmentId ,
    delete : false ,
  });
  res.json(assignment) ;
};