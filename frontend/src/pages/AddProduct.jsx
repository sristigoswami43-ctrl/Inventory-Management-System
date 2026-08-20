import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddProduct() {

    const navigate = useNavigate();


    // ============================
    // Supplier and warehouse data
    // ============================

    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);


    // ============================
    // Loading states
    // ============================

    const [loadingSuppliers, setLoadingSuppliers] = useState(true);
    const [loadingWarehouses, setLoadingWarehouses] = useState(true);


    // ============================
    // API error
    // ============================

    const [fetchError, setFetchError] = useState("");


    // ============================
    // Product form data
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
    // Fetch suppliers and warehouses
    // ============================

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoadingSuppliers(true);
                setLoadingWarehouses(true);
                setFetchError("");


                // ============================
                // Fetch Suppliers
                // ============================

                const supplierResponse =
                    await api.get("/suppliers");


                console.log(
                    "Suppliers API response:",
                    supplierResponse.data
                );


                setSuppliers(
                    supplierResponse.data.data || []
                );


                // ============================
                // Fetch Warehouses
                // ============================

                const warehouseResponse =
                    await api.get("/warehouses");


                console.log(
                    "WAREHOUSE RESPONSE:",
                    warehouseResponse.data
                );

                console.log(
                    "WAREHOUSE DATA:",
                    warehouseResponse.data.data
                );

                console.log(
                    "WAREHOUSE COUNT:",
                    warehouseResponse.data.data?.length
                );


                setWarehouses(
                    warehouseResponse.data.data || []
                );


            } catch (error) {

                console.error(
                    "Error fetching supplier/warehouse data:",
                    error
                );


                setFetchError(
                    error.response?.data?.message ||
                    "Failed to load suppliers or warehouses"
                );


            } finally {

                setLoadingSuppliers(false);
                setLoadingWarehouses(false);

            }

        };


        fetchData();

    }, []);


    // ============================
    // Submit Product
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setFetchError("");


            // ============================
            // Prepare product data
            // ============================

            const productData = {

                productName: formData.productName,

                category: formData.category,

                brand: formData.brand,

                purchasePrice:
                    Number(formData.purchasePrice),

                sellingPrice:
                    Number(formData.sellingPrice),

                quantity:
                    Number(formData.quantity),

                minimumStock:
                    Number(formData.minimumStock),

                supplier:
                    formData.supplier,

                warehouse:
                    formData.warehouse,

                expiryDate:
                    formData.expiryDate || undefined

            };


            console.log(
                "Sending product data:",
                productData
            );


            // ============================
            // POST product to backend
            // ============================

            const response = await api.post(
                "/products",
                productData
            );


            console.log(
                "Add Product API response:",
                response.data
            );


            // ============================
            // Success
            // ============================

            alert("Product added successfully!");


            navigate("/products");


        } catch (error) {

            console.error(
                "Error adding product:",
                error
            );


            setFetchError(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };


    return (

        <div className="add-product-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Add Product
                    </h1>

                    <p>
                        Add a new product to your inventory
                    </p>

                </div>

            </div>



            {/* ============================
                FORM CARD
            ============================ */}

            <div className="product-form-card">


                {/* ============================
                    API ERROR
                ============================ */}

                {fetchError && (

                    <div className="error-message">

                        {fetchError}

                    </div>

                )}



                <form onSubmit={handleSubmit}>


                    {/* ============================
                        PRODUCT NAME
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Product Name
                        </label>

                        <input
                            type="text"
                            name="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            required
                        />

                    </div>



                    {/* ============================
                        CATEGORY
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                        />

                    </div>



                    {/* ============================
                        BRAND
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Brand
                        </label>

                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Enter brand"
                            required
                        />

                    </div>



                    {/* ============================
                        PURCHASE PRICE
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Purchase Price
                        </label>

                        <input
                            type="number"
                            name="purchasePrice"
                            value={formData.purchasePrice}
                            onChange={handleChange}
                            placeholder="Enter purchase price"
                            min="0"
                            required
                        />

                    </div>



                    {/* ============================
                        SELLING PRICE
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Selling Price
                        </label>

                        <input
                            type="number"
                            name="sellingPrice"
                            value={formData.sellingPrice}
                            onChange={handleChange}
                            placeholder="Enter selling price"
                            min="0"
                            required
                        />

                    </div>



                    {/* ============================
                        QUANTITY
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Quantity
                        </label>

                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            placeholder="Enter quantity"
                            min="0"
                            required
                        />

                    </div>



                    {/* ============================
                        MINIMUM STOCK
                    ============================ */}

                    <div className="form-group">

                        <label>
                            Minimum Stock
                        </label>

                        <input
                            type="number"
                            name="minimumStock"
                            value={formData.minimumStock}
                            onChange={handleChange}
                            placeholder="Enter minimum stock"
                            min="0"
                            required
                        />

                    </div>



                    {/* ============================
                        SUPPLIER
                    ============================ */}

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



                    {/* ============================
                        WAREHOUSE
                    ============================ */}

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
                                    : "Select Warehouse"
                                }

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



                    {/* ============================
                        EXPIRY DATE
                    ============================ */}

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



                    {/* ============================
                        BUTTONS
                    ============================ */}

                    <div className="form-actions">


                        {/* CANCEL */}

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/products")
                            }
                        >

                            Cancel

                        </button>



                        {/* ADD PRODUCT */}

                        <button
                            type="submit"
                            className="primary-button"
                        >

                            Add Product

                        </button>


                    </div>


                </form>

            </div>

        </div>

    );

}

export default AddProduct;