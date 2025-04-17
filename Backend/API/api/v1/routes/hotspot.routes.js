const express = require("express") ;
const router =  express.Router() ;

const controllerHotspot = require("../controller/hotspot.controller") ;

router.get("/" , controllerHotspot.index);
router.get("/detail/:hotspotId" , controllerHotspot.detail) ;

module.exports = router ;