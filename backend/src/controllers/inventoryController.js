const inventoryService =
require("../services/inventoryService");



exports.stockIn = async(req,res)=>{

try{


const inventory =
await inventoryService.stockIn(req.body);



res.status(201).json({

success:true,

message:"Stock added successfully",

data:inventory

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}

};




exports.getInventory = async(req,res)=>{

try{


const inventory =
await inventoryService.getInventory();



res.status(200).json({

success:true,

data:inventory

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});


}

};