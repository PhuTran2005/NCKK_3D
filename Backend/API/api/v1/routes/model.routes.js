const express = require("express") ;
const router =  express.Router() ;

const controllerModel = require("../controller/model.controller") ;

router.get("/" , controllerModel.index);
router.get("/detail/:modelId" , controllerModel.detail) ;

module.exports = router ;
