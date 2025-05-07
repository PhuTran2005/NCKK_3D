const TrainingResults = require("../../../model/trainingResults.model");
const Account = require("../../../model/account.model") ;
// get all training results
module.exports.index = async (req, res) => {
  try {
    const listTrainingResults = await TrainingResults.find({ delete: false });
    res.json(listTrainingResults);
  } catch (error) {
    res.json({ code: 404, message: "Lỗi không lấy được" });
  }
};

// create trainingResult .
module.exports.create = async (req, res) => {
  try {
    const trainingResult = new TrainingResults({
      account_id : req.body.account_id ,
      answers : req.body.answers ,
      score : parseInt(req.body.score)
  });
    await trainingResult.save();
    res.json({code : 200 , message : "Tạo thành công"});
  } catch {
    res.json({ code: 404, message: "Lỗi không lưu được" });
  }
};
