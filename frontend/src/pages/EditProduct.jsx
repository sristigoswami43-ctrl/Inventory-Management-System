import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {

    const navigate = useNavigate();
    const { id } = useParams();

    // ============================
    // Supplier and warehouse data
    // ============================

    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    // ============================
    // Loading states
    // ============================

    const [loading, setLoading] = useState(true);
    const [loadingSuppliers, setLoadingSuppliers] = useState(true);
    const [loadingWarehouses, setLoadingWarehouses] = useState(true);

    // ============================
    // Error
    // ============================

    const [error, setError] = useState("");

    // ============================
    // Product form
    // ============================

    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        brand: "",
        purchasePrice: "",
        sellingPrice: "",
        quantity: "",
        minimumStock: "",
        supplier: "",
        warehouse: "",
        expiryDate: ""
    });


    // ============================
    // Handle input changes
    // ============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // ============================
    // Fetch Product
    // ============================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                setLoading(true);
                setError("");

                console.log(
                    "Fetching product:",
                    id
                );

                const response = await api.get(
                    `/products/${id}`
                );

                console.log(
                    "Product API response:",
                    response.data
                );

                const product = response.data.data;

                setFormData({
                    productName: product.productName || "",
                    category: product.category || "",
                    brand: product.brand || "",
                    purchasePrice: product.purchasePrice ?? "",
                    sellingPrice: product.sellingPrice ?? "",
                    quantity: product.quantity ?? "",
                    minimumStock: product.minimumStock ?? "",
                    supplier: product.supplier?._id || product.supplier || "",
                    warehouse: product.warehouse?._id || product.warehouse || "",
                    expiryDate: product.expiryDate
                        ? product.expiryDate.substring(0, 10)
                        : ""
                });

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
    // Fetch Suppliers
    // ============================

    useEffect(() => {

        const fetchSuppliers = async () => {

            try {

                setLoadingSuppliers(true);

                const response = await api.get(
                    "/suppliers"
                );

                console.log(
                    "Suppliers API response:",
                    response.data
                );

                setSuppliers(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching suppliers:",
                    error
                );

            } finally {

                setLoadingSuppliers(false);

            }

        };

        fetchSuppliers();

    }, []);


    // ============================
    // Fetch Warehouses
    // ============================

    useEffect(() => {

        const fetchWarehouses = async () => {

            try {

                setLoadingWarehouses(true);

                const response = await api.get(
                    "/warehouses"
                );

                console.log(
                    "Warehouses API response:",
                    response.data
                );

                setWarehouses(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching warehouses:",
                    error
                );

            } finally {

                setLoadingWarehouses(false);

            }

        };

        fetchWarehouses();

    }, []);


    // ============================
    // Submit
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");

            const productData = {
                productName: formData.productName,
                category: formData.category,
                brand: formData.brand,
                purchasePrice: Number(formData.purchasePrice),
                sellingPrice: Number(formData.sellingPrice),
                quantity: Number(formData.quantity),
                minimumStock: Number(formData.minimumStock),
                supplier: formData.supplier,
                warehouse: formData.warehouse,
                expiryDate: formData.expiryDate || undefined
            };

            console.log(
                "Updating product:",
                productData
            );

            const response = await api.put(
                `/products/${id}`,
                productData
            );

            console.log(
                "Update Product API response:",
                response.data
            );

            alert("Product updated successfully!");

            navigate("/products");

        } catch (error) {

            console.error(
                "Error updating product:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update product"
            );

        }

    };


    // ============================
    // Loading screen
    // ============================

    if (loading) {

        return (
            <div className="add-product-page">

                <div className="page-header">

                    <div>

                        <h1>Edit Product</h1>

                        <p>
                            Loading product information...
                        </p>

                    </div>

                </div>

            </div>
        );

    }


    // ============================
    // Page
    // ============================

    return (

        <div className="add-product-page">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h1>Edit Product</h1>

                    <p>
                        Update your product information
                    </p>

                </div>

            </div>


            {/* Form Card */}

            <div className="product-form-card">

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    {/* Product Name */}

                    <div className="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Category */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Brand */}

                    <div className="form-group">

                        <label>
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Purchase Price */}

                    <div className="form-group">

                        <label>
                            Purchase Price
                        </label>

                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>


                    {/* Selling Price */}

                    <div className="form-group">

                        <label>
                            Selling Price
                        </label>

                        <input
                            type="number"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>


                    {/* Quantity */}

                    <div className="form-group">

                        <label>
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>


                    {/* Minimum Stock */}

                    <div className="form-group">

                        <label>
                            Minimum Stock
                        </label>

                        <input
                            type="number"
                            name="minimumStock"
                            value={formData.minimumStock}
                            onChange={handleChange}
                            min="0"
                            required
                        />

                    </div>


                    {/* Supplier */}

                    <div className="form-group">

                        <label>
                            Supplier
                        </label>

                        <select
                            name="supplier"
                            value={formData.supplier}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                {loadingSuppliers
                                    ? "Loading suppliers..."
                                    : "Select Supplier"}
                            </option>

                            {suppliers.map((supplier) => (

                                <option
                                    key={supplier._id}
                                    value={supplier._id}
                                >
                                    {supplier.supplierName}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Warehouse */}

                    <div className="form-group">

                        <label>
                            Warehouse
                        </label>

                        <select
                            name="warehouse"
                            value={formData.warehouse}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                {loadingWarehouses
                                    ? "Loading warehouses..."
                                    : "Select Warehouse"}
                            </option>

                            {warehouses.map((warehouse) => (

                                <option
                                    key={warehouse._id}
                                    value={warehouse._id}
                                >
                                    {warehouse.warehouseName}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Expiry Date */}

                    <div className="form-group">

                        <label>
                            Expiry Date
                        </label>

                        <input
                            type="date"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Buttons */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/products")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default EditProduct;