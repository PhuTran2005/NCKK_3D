const express = require('express') ;
const router = express.Router() ;

const controller = require("../controller/assignment.controller") ;

// get all assignment .
router.get("/" , controller.index) ;
// get one assignment .
router.get("/detail/:assignmentId" , controller.detail) ;

// router.get("/create" , controller.create) ;
// router.post("/create" , controller.createPost) ;
// router.get("/edit/:assignmentId" , controller.edit) ;
// router.patch("/edit/:assignmentId" , controller.editPatch) ;

module.exports = router ;