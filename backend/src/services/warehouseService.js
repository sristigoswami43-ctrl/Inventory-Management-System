const Warehouse = require("../models/warehouseModel");


const createWarehouse = async(data)=>{

    return await Warehouse.create(data);

};


const getWarehouses = async()=>{

    return await Warehouse.find();

};


const getWarehouseById = async(id)=>{

    return await Warehouse.findById(id);

};


const updateWarehouse = async(id,data)=>{

    return await Warehouse.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );

};


const deleteWarehouse = async(id)=>{

    return await Warehouse.findByIdAndDelete(id);

};


module.exports={
    createWarehouse,
    getWarehouses,
    getWarehouseById,
    updateWarehouse,
    deleteWarehouse
};