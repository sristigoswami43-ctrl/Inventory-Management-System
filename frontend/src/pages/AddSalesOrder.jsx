import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddSalesOrder() {

    const navigate = useNavigate();

    // ==========================================
    // Form State
    // ==========================================

    const [customer, setCustomer] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const [customers, setCustomers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Customers, Warehouses and Products
    // ==========================================

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    customersResponse,
                    warehousesResponse,
                    productsResponse
                ] = await Promise.all([
                    api.get("/customers"),
                    api.get("/warehouses"),
                    api.get("/products")
                ]);

                console.log(
                    "Customers:",
                    customersResponse.data
                );

                console.log(
                    "Warehouses:",
                    warehousesResponse.data
                );

                console.log(
                    "Products:",
                    productsResponse.data
                );

                setCustomers(
                    customersResponse.data.data || []
                );

                setWarehouses(
                    warehousesResponse.data.data || []
                );

                setProducts(
                    productsResponse.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error loading sales order data:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load customers, warehouses or products"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);

    // ==========================================
    // Automatically Set Product Price
    // ==========================================

    const handleProductChange = (productId) => {

        setProduct(productId);

        const selectedProduct = products.find(
            (item) => item._id === productId
        );

        if (selectedProduct) {

            setPrice(
                selectedProduct.sellingPrice || 0
            );

        } else {

            setPrice("");

        }

    };

    // ==========================================
    // Calculate Total Amount
    // ==========================================

    const totalAmount =
        Number(quantity || 0) *
        Number(price || 0);

    // ==========================================
    // Create Sales Order
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        // Basic validation

        if (!customer) {

            setError("Please select a customer.");
            return;

        }

        if (!warehouse) {

            setError("Please select a warehouse.");
            return;

        }

        if (!product) {

            setError("Please select a product.");
            return;

        }

        if (!quantity || Number(quantity) < 1) {

            setError(
                "Quantity must be at least 1."
            );

            return;

        }

        if (price === "" || Number(price) < 0) {

            setError(
                "Please enter a valid price."
            );

            return;

        }

        if (totalAmount <= 0) {

            setError(
                "Total amount must be greater than 0."
            );

            return;

        }

        try {

            setSaving(true);

            const salesOrderData = {

                customer: customer,

                warehouse: warehouse,

                products: [
                    {
                        product: product,
                        quantity: Number(quantity),
                        price: Number(price)
                    }
                ],

                totalAmount: totalAmount,

                status: "Pending"

            };

            console.log(
                "Creating sales order:",
                salesOrderData
            );

            await api.post(
                "/sales-orders",
                salesOrderData
            );

            alert(
                "Sales order created successfully!"
            );

            navigate("/sales-orders");

        } catch (error) {

            console.error(
                "Error creating sales order:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create sales order"
            );

        } finally {

            setSaving(false);

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="suppliers-page">

                <p>
                    Loading sales order form...
                </p>

            </div>

        );

    }

    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="suppliers-page">

            {/* ==================================
                PAGE HEADER
            ================================== */}

            <div className="page-header">

                <div>

                    <h1>
                        Create Sales Order
                    </h1>

                    <p>
                        Create a new sales order
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                >
                    ← Back to Sales Orders
                </button>

            </div>


            {/* ==================================
                ERROR
            ================================== */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* ==================================
                FORM
            ================================== */}

            <div className="products-table-container">

                <form onSubmit={handleSubmit}>

                    {/* Customer */}

                    <div className="form-group">

                        <label>
                            Customer
                        </label>

                        <select
                            value={customer}
                            onChange={(event) =>
                                setCustomer(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select Customer
                            </option>

                            {customers.map(
                                (item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.customerName}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Warehouse */}

                    <div className="form-group">

                        <label>
                            Warehouse
                        </label>

                        <select
                            value={warehouse}
                            onChange={(event) =>
                                setWarehouse(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select Warehouse
                            </option>

                            {warehouses.map(
                                (item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.warehouseName}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Product */}

                    <div className="form-group">

                        <label>
                            Product
                        </label>

                        <select
                            value={product}
                            onChange={(event) =>
                                handleProductChange(
                                    event.target.value
                                )
                            }
                            required
                        >

                            <option value="">
                                Select Product
                            </option>

                            {products.map(
                                (item) => (

                                    <option
                                        key={item._id}
                                        value={item._id}
                                    >
                                        {item.productName}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Quantity */}

                    <div className="form-group">

                        <label>
                            Quantity
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(event) =>
                                setQuantity(
                                    event.target.value
                                )
                            }
                            placeholder="Enter quantity"
                            required
                        />

                    </div>


                    {/* Price */}

                    <div className="form-group">

                        <label>
                            Price
                        </label>

                        <input
                            type="number"
                            min="0"
                            value={price}
                            onChange={(event) =>
                                setPrice(
                                    event.target.value
                                )
                            }
                            placeholder="Enter price"
                            required
                        />

                    </div>


                    {/* Total Amount */}

                    <div className="form-group">

                        <label>
                            Total Amount
                        </label>

                        <input
                            type="number"
                            value={totalAmount}
                            readOnly
                        />

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <input
                            type="text"
                            value="Pending"
                            readOnly
                        />

                    </div>


                    {/* Buttons */}

                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Creating..."
                                : "Create Sales Order"
                            }
                        </button>


                        <button
                            type="button"
                            className="view-button"
                            style={{
                                marginLeft: "10px"
                            }}
                            onClick={() =>
                                navigate(
                                    "/sales-orders"
                                )
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddSalesOrder;