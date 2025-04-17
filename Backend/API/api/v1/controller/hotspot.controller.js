const Model = require("../../../model/model.model");
const Hotspot = require("../../../model/hotspot.model");

module.exports.index = async (req, res) => {
  try {
    const hotspots = await Hotspot.find(
        {
            delete : false ,
            status : "active" , 
        }
    )
    res.json(hotspots) ;
  }
  catch{
    console.log("error") ;
  }
};

module.exports.detail = async (req, res) => {
  try {
    const hotspotId = req.params.hotspotId;
    const hotspot = await Hotspot.findOne({
      delete: false,
      _id: hotspotId,
      status : "active" ,
    });
    res.json(hotspot) ;
  } catch {
    console.log("detail error");
  }
};
