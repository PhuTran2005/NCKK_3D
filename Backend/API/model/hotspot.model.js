const mongoose = require("mongoose") ;

const hotspotSchema = new mongoose.Schema(
    {
        slot: String,
        x: String,
        y: String,
        z: String,
        info: String,
        img: String,
        status : String ,
        delete : {
            type : Boolean , 
            default : false ,
        }
    }
)

const Hotspot = mongoose.model("Hotspots" , hotspotSchema , "hotspot") ;
module.exports = Hotspot ;