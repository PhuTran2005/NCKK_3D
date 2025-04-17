const mongoose = require("mongoose") ;

module.exports.connect = async (url) => {
    try {
        await mongoose.connect(url) ;
        console.log("Connect success") ;
    }
    catch {
        console.log("No connect to database") ;
    }
}