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
    const account = await Account.find({loginName : res.locals.loginName , delete : false}) ;
    let listQuestion = req.body.listQuestion.split("-");
    let listSelect = req.body.listSelect.split("-");
    console.log(listQuestion);
    console.log(listSelect);
    console.log(parseInt(req.body.score));
    console.log(account._id) ;
    const trainingResult = new TrainingResults({
      account_id : account._id ,
      listQuestion : listQuestion ,
      listSelect : listSelect ,
      score : parseInt(req.body.score)
  });
    await trainingResult.save();
    res.json({code : 200 , message : "Tạo thành công"});
  } catch {
    res.json({ code: 404, message: "Lỗi không lưu được" });
  }
};
