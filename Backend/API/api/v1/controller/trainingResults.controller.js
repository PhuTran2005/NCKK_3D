const TrainingResults = require("../../../model/trainingResults.model");

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
    let listQuestion = req.body.listQuestion.split("-");
    let listSelect = req.body.listSelect.split("-");
    console.log(listQuestion);
    console.log(listSelect);
    console.log(parseInt(req.body.score));
    const trainingResult = new TrainingResults({
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
