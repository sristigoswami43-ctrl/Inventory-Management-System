import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ============================
    // Fetch Product
    // ============================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/products/${id}`);

                console.log(
                    "Product Details API response:",
                    response.data
                );

                setProduct(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Error fetching product:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load product"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProduct();

    }, [id]);


    // ============================
    // Loading
    // ============================

    if (loading) {

        return (
            <div className="product-details-page">

                <p>
                    Loading product details...
                </p>

            </div>
        );

    }


    // ============================
    // Error
    // ============================

    if (error) {

        return (
            <div className="product-details-page">

                <p className="error-message">
                    {error}
                </p>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Back to Products
                </button>

            </div>
        );

    }


    // ============================
    // Product Not Found
    // ============================

    if (!product) {

        return (
            <div className="product-details-page">

                <p>
                    Product not found.
                </p>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Back to Products
                </button>

            </div>
        );

    }


    // ============================
    // Supplier Name
    // ============================

    const supplierName =
        product.supplier?.supplierName ||
        "N/A";


    // ============================
    // Warehouse Name
    // ============================

    const warehouseName =
        product.warehouse?.warehouseName ||
        "N/A";


    // ============================
    // Page
    // ============================

    return (

        <div className="product-details-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Product Details
                    </h1>

                    <p>
                        View product and inventory information
                    </p>

                </div>

            </div>


            {/* ============================
                PRODUCT DETAILS CARD
            ============================ */}

            <div className="product-details-card">


                {/* Product Name */}

                <div className="detail-item">

                    <span className="detail-label">
                        Product Name
                    </span>

                    <span className="detail-value">
                        {product.productName}
                    </span>

                </div>


                {/* Category */}

                <div className="detail-item">

                    <span className="detail-label">
                        Category
                    </span>

                    <span className="detail-value">
                        {product.category}
                    </span>

                </div>


                {/* Brand */}

                <div className="detail-item">

                    <span className="detail-label">
                        Brand
                    </span>

                    <span className="detail-value">
                        {product.brand}
                    </span>

                </div>


                {/* Purchase Price */}

                <div className="detail-item">

                    <span className="detail-label">
                        Purchase Price
                    </span>

                    <span className="detail-value">
                        ₹{product.purchasePrice}
                    </span>

                </div>


                {/* Selling Price */}

                <div className="detail-item">

                    <span className="detail-label">
                        Selling Price
                    </span>

                    <span className="detail-value">
                        ₹{product.sellingPrice}
                    </span>

                </div>


                {/* Quantity */}

                <div className="detail-item">

                    <span className="detail-label">
                        Quantity
                    </span>

                    <span className="detail-value">
                        {product.quantity}
                    </span>

                </div>


                {/* Minimum Stock */}

                <div className="detail-item">

                    <span className="detail-label">
                        Minimum Stock
                    </span>

                    <span className="detail-value">
                        {product.minimumStock}
                    </span>

                </div>


                {/* Supplier */}

                <div className="detail-item">

                    <span className="detail-label">
                        Supplier
                    </span>

                    <span className="detail-value">
                        {supplierName}
                    </span>

                </div>


                {/* Warehouse */}

                <div className="detail-item">

                    <span className="detail-label">
                        Warehouse
                    </span>

                    <span className="detail-value">
                        {warehouseName}
                    </span>

                </div>


                {/* Expiry Date */}

                <div className="detail-item">

                    <span className="detail-label">
                        Expiry Date
                    </span>

                    <span className="detail-value">

                        {product.expiryDate
                            ? new Date(
                                product.expiryDate
                            ).toLocaleDateString()
                            : "N/A"}

                    </span>

                </div>


                {/* Status */}

                <div className="detail-item">

                    <span className="detail-label">
                        Status
                    </span>

                    <span className="detail-value">
                        {product.status}
                    </span>

                </div>


                {/* ============================
                    BUTTONS
                ============================ */}

                <div className="form-actions">


                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Back to Products
                    </button>


                    <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                            navigate(
                                `/products/edit/${product._id}`
                            )
                        }
                    >
                        Edit Product
                    </button>

                </div>


            </div>

        </div>

    );

}

export default ProductDetails;