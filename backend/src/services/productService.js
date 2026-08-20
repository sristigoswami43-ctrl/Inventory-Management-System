const Product = require("../models/productModel");


// Add New Product
const createProduct = async (productData) => {
    try {

        const product = await Product.create(productData);

        return product;

    } catch (error) {
        throw error;
    }
};



// Get All Products
const getAllProducts = async () => {
    try {

        const products = await Product.find()
            .populate("supplier")
            .populate("warehouse");

        return products;

    } catch (error) {
        throw error;
    }
};



// Get Single Product By ID
const getProductById = async (productId) => {
    try {

        const product = await Product.findById(productId)
            .populate("supplier")
            .populate("warehouse");


        if (!product) {
            throw new Error("Product not found");
        }


        return product;

    } catch (error) {
        throw error;
    }
};



// Update Product
const updateProduct = async (productId, updateData) => {
    try {

        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("supplier")
        .populate("warehouse");


        if (!product) {
            throw new Error("Product not found");
        }


        return product;

    } catch(error) {
        throw error;
    }
};



// Delete Product
const deleteProduct = async (productId) => {
    try {

        const product = await Product.findByIdAndDelete(productId);


        if(!product){
            throw new Error("Product not found");
        }


        return product;

    } catch(error){
        throw error;
    }
};



module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};