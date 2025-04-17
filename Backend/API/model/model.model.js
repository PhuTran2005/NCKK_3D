const mongoose = require("mongoose") ;

const modelSchema = new mongoose.Schema (
    {
        name : String  ,
        linkFile : String ,
        hotspots : {
            type : Array,  
            default : [] , 
        } ,
        delete :  {
            type : Boolean ,
            default : false,
        }
    }
)

const Model = mongoose.model("Model", modelSchema ,"model");
module.exports= Model  ;