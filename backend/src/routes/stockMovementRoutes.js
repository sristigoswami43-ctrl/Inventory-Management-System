const express=require("express");

const router=express.Router();


const {
createMovement,
getMovements

}=require("../controllers/stockMovementController");



router.post(
"/",
createMovement
);


router.get(
"/",
getMovements
);


module.exports=router;