const express = require('express')
const router = express.Router();
const {login,signup} = require('../controller/userController.js');
const {createObject, viewObject,updateStatus,deleteObject} = require('../controller/interviewTableController.js')
router.post("/login",login)
router.post("/signup",signup)
//router.get("/profile",profile)
router.post("/create",createObject);
router.get("/view",viewObject);
router.put("/update/:_id",updateStatus);
router.delete("/delete/:_id",deleteObject);
module.exports=router;