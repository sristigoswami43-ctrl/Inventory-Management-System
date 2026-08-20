const express = require("express");
const verifyToken=require("../middlewares/authMiddleware.js")
const router = express.Router();
const authorizeRoles=require("../middlewares/roleMiddleware.js")


const {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct

} = require("../controllers/productController");



// ============================
// Product Routes
// ============================


// Add Product
router.post(
    "/",verifyToken,authorizeRoles("admin","manager"),
    addProduct
);


// Get All Products
router.get(
    "/",verifyToken,authorizeRoles("admin","manager","employee"),
    getProducts
);


// Get Single Product
router.get(
    "/:id",verifyToken,authorizeRoles("admin","manager","employee"),
    getProduct
);


// Update Product
router.put(
    "/:id",verifyToken,authorizeRoles("admin","manager"),
    updateProduct
);


// Delete Product
router.delete(
    "/:id",verifyToken,authorizeRoles("admin"),
    deleteProduct
);



module.exports = router;