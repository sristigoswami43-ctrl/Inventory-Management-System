const Customer = require("../models/customerModel");

// Create Customer
const createCustomer = async (data) => {
    const customer = await Customer.create(data);

    return customer;
};


// Get All Customers
const getCustomers = async () => {
    return await Customer.find().sort({ createdAt: -1 });
};


// Get Customer By ID
const getCustomerById = async (id) => {
    const customer = await Customer.findById(id);

    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
};


// Update Customer
const updateCustomer = async (id, data) => {
    const customer = await Customer.findByIdAndUpdate(
        id,
        data,
        {
            new: true,
            runValidators: true
        }
    );

    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
};


// Delete Customer
const deleteCustomer = async (id) => {
    const customer = await Customer.findByIdAndDelete(id);

    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
};


module.exports = {
    createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};