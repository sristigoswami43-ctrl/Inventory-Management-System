const productService = require("../services/productService");


// ============================
// Add Product
// POST /api/products
// ============================

const addProduct = async (req, res) => {

    try {

        const product = await productService.createProduct(req.body);


        res.status(201).json({
            success: true,
            message: "Product added successfully",
            data: product
        });


    } catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};




// ============================
// Get All Products
// GET /api/products
// ============================

const getProducts = async (req,res)=>{

    try{

        const products = await productService.getAllProducts();


        res.status(200).json({
            success:true,
            count:products.length,
            data:products
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// ============================
// Get Product By ID
// GET /api/products/:id
// ============================

const getProduct = async(req,res)=>{

    try{

        const product = await productService.getProductById(
            req.params.id
        );


        res.status(200).json({
            success:true,
            data:product
        });


    }catch(error){

        res.status(404).json({
            success:false,
            message:error.message
        });

    }

};




// ============================
// Update Product
// PUT /api/products/:id
// ============================

const updateProduct = async(req,res)=>{

    try{


        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );


        res.status(200).json({
            success:true,
            message:"Product updated successfully",
            data:product
        });



    }catch(error){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};




// ============================
// Delete Product
// DELETE /api/products/:id
// ============================

const deleteProduct = async(req,res)=>{

    try{


        await productService.deleteProduct(
            req.params.id
        );


        res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        });



    }catch(error){

        res.status(404).json({
            success:false,
            message:error.message
        });

    }

};



module.exports = {

    addProduct,

    getProducts,

    getProduct,

    updateProduct,

    deleteProduct

};