const Supplier = require("../models/supplierModel");


const createSupplier = async(data)=>{

    const supplier = await Supplier.create(data);

    return supplier;

};


const getSuppliers = async()=>{

    return await Supplier.find();

};


const getSupplierById = async(id)=>{

    return await Supplier.findById(id);

};


const updateSupplier = async(id,data)=>{

    return await Supplier.findByIdAndUpdate(
        id,
        data,
        {new:true}
    );

};


const deleteSupplier = async(id)=>{

    return await Supplier.findByIdAndDelete(id);

};


module.exports={
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
};