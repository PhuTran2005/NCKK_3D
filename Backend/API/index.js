const express = require("express")
const database = require("./config/database") ;


database.connect("mongodb+srv://phanquocthang211005:dEXJJoXm6OCbNtaa@cluster0.2thib.mongodb.net/NCKH") ;
require("dotenv").config() ;

const app = express() ;

// port
const port = process.env.PORT ;

// call api by localhost .
const cors = require('cors');
app.use(cors()); 
app.use(express.json());
// api routes v1
const routesV1 = require("./api/v1/routes/index.routes") ;
routesV1(app) ;

app.listen(port , ()=>{
    console.log(port) ;
})