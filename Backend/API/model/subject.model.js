const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema(
    {
        subjectName: String ,
        listQuestion : {
            type : Array ,
            default : [] ,
        }
    }
)

const Subject = mongoose.model("Subject" , subjectSchema , "subject") ;
module.exports = Subject ;