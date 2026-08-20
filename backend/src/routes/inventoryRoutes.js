const express=require("express");

const router=express.Router();


const {
stockIn,
getInventory

}=require("../controllers/inventoryController");



router.post(
"/stock-in",
stockIn
);


router.get(
"/",
getInventory
);



module.exports=router;