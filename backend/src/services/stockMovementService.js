const StockMovement =
require("../models/stockMovementModel");



const createMovement = async(data)=>{


    const movement =
    await StockMovement.create(data);


    return movement;

};



const getMovements = async()=>{


    return await StockMovement.find()

    .populate("product")

    .populate("warehouse")

    .populate("createdBy");


};



module.exports={

createMovement,

getMovements

};