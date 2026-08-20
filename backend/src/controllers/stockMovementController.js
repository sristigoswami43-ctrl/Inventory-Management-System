const stockMovementService =
require("../services/stockMovementService");



exports.createMovement = async(req,res)=>{

try{


const movement =
await stockMovementService.createMovement(req.body);



res.status(201).json({

success:true,

message:"Stock movement created",

data:movement

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}

};



exports.getMovements = async(req,res)=>{

try{


const movements =
await stockMovementService.getMovements();



res.status(200).json({

success:true,

data:movements

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};