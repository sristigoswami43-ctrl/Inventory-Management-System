const express = require ("express");
const verifyToken=require("../middlewares/authMiddleware.js")
const router = express.Router();
const authorizeRoles=require("../middlewares/roleMiddleware.js")
//Only admin can access this router

router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
    res.json({message:"Welcome Admin"})
})

//Both admin and manager can access this router
router.get("/manager",verifyToken,authorizeRoles("admin","manager"),(req,res)=>{
    res.json({message:"Welcome Manager"})
})

//All can access this router
router.get("/employee",verifyToken,authorizeRoles("admin","manager","employee"),(req,res)=>{
    res.json({message:"Welcome Employee"})
})

module.exports = router;