const mongoose = require('mongoose') ;
const generateToken = require('../helpers/generate') ;

const accountSchema = new mongoose.Schema(
    {
        loginName : String ,
        password : String ,
        token : {
            type : String , 
            default : generateToken.generateToken(20) ,
        }
    }
)

const Account = mongoose.model("Account" , accountSchema , "accountUser") ;
module.exports = Account ;