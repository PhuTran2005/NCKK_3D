const Model = require("../../../model/model.model");
const Hotspot = require("../../../model/hotspot.model");

module.exports.index = async (req, res) => {
  const models = await Model.find({ delete: false }).select("-__v -hotpots");
  for (let model of models) {
    let newHotspot = [];
    const hotspots = model.hotspots;
    for (let hotspot of hotspots) {
      const itemHotspot = await Hotspot.findOne({
        delete: false,
        status: "active",
        _id: hotspot.hotspot_id,
      }).select("-_id -__v -delete -status");
      newHotspot.push(itemHotspot);
    }
    model.hotspots = newHotspot ;
  }
  res.json(models) ;
};

module.exports.detail = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    const model = await Model.findOne({
      delete: false,
      _id: modelId,
    });
    res.json(model) ;
  } catch {
    console.log("detail error");
  }
};
