import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function StockIn() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);

    const [formData, setFormData] = useState({
        product: "",
        warehouse: "",
        quantity: "",
        reservedStock: "",
        reference: "",
        note: ""
    });

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");

    // ============================
    // Fetch Products & Warehouses
    // ============================

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoadingData(true);
                setError("");

                const [
                    productsResponse,
                    warehousesResponse
                ] = await Promise.all([
                    api.get("/products"),
                    api.get("/warehouses")
                ]);

                console.log(
                    "Products:",
                    productsResponse.data
                );

                console.log(
                    "Warehouses:",
                    warehousesResponse.data
                );

                setProducts(
                    productsResponse.data.data || []
                );

                setWarehouses(
                    warehousesResponse.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error loading stock-in data:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load products and warehouses"
                );

            } finally {

                setLoadingData(false);

            }

        };

        fetchData();

    }, []);


    // ============================
    // Handle Input
    // ============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ============================
    // Submit Stock In
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!formData.product) {

            setError("Please select a product.");
            return;

        }

        if (!formData.warehouse) {

            setError("Please select a warehouse.");
            return;

        }

        if (!formData.quantity || Number(formData.quantity) <= 0) {

            setError("Quantity must be greater than 0.");
            return;

        }

        if (
            formData.reservedStock &&
            Number(formData.reservedStock) > Number(formData.quantity)
        ) {

            setError(
                "Reserved stock cannot be greater than total quantity."
            );

            return;

        }

        try {

            setLoading(true);

            const response = await api.post(
                "/inventory/stock-in",
                {
                    product: formData.product,
                    warehouse: formData.warehouse,
                    quantity: Number(formData.quantity),
                    reservedStock:
                        Number(formData.reservedStock) || 0,
                    reference:
                        formData.reference || "STOCK-IN",
                    note:
                        formData.note || "Stock received"
                }
            );

            console.log(
                "Stock In response:",
                response.data
            );

            alert("Stock added successfully!");

            navigate("/inventory");

        } catch (error) {

            console.error(
                "Error adding stock:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to add stock"
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================
    // Loading
    // ============================

    if (loadingData) {

        return (

            <div className="page-container">

                <p>
                    Loading products and warehouses...
                </p>

            </div>

        );

    }


    // ============================
    // Page
    // ============================

    return (

        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>
                        Stock In
                    </h1>

                    <p>
                        Add stock to a warehouse
                    </p>

                </div>

            </div>


            <div className="form-card">

                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        {/* ============================
                            PRODUCT
                        ============================ */}

                        <div className="form-group">

                            <label>
                                Product
                            </label>

                            <select
                                name="product"
                                value={formData.product}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select Product
                                </option>

                                {products.map(
                                    (product) => (

                                        <option
                                            key={product._id}
                                            value={product._id}
                                        >
                                            {product.productName}
                                        </option>

                                    )
                                )}

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
                                    Select Warehouse
                                </option>

                                {warehouses.map(
                                    (warehouse) => (

                                        <option
                                            key={warehouse._id}
                                            value={warehouse._id}
                                        >
                                            {warehouse.warehouseName}
                                        </option>

                                    )
                                )}

                            </select>

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
                                min="1"
                                placeholder="Enter quantity"
                                required
                            />

                        </div>


                        {/* ============================
                            RESERVED STOCK
                        ============================ */}

                        <div className="form-group">

                            <label>
                                Reserved Stock
                            </label>

                            <input
                                type="number"
                                name="reservedStock"
                                value={formData.reservedStock}
                                onChange={handleChange}
                                min="0"
                                placeholder="Enter reserved quantity"
                            />

                        </div>


                        {/* ============================
                            REFERENCE
                        ============================ */}

                        <div className="form-group">

                            <label>
                                Reference
                            </label>

                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleChange}
                                placeholder="e.g. PO-001"
                            />

                        </div>


                        {/* ============================
                            NOTE
                        ============================ */}

                        <div className="form-group">

                            <label>
                                Note
                            </label>

                            <input
                                type="text"
                                name="note"
                                value={formData.note}
                                onChange={handleChange}
                                placeholder="Optional note"
                            />

                        </div>

                    </div>


                    {/* ============================
                        ACTIONS
                    ============================ */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/inventory")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Stock"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default StockIn;