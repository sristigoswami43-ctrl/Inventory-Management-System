import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PurchaseOrderAdd() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [supplier, setSupplier] = useState("");
    const [warehouse, setWarehouse] = useState("");

    const [items, setItems] = useState([
        {
            product: "",
            quantity: 1,
            price: 0
        }
    ]);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // Fetch Suppliers, Warehouses and Products
    // ==========================================

    useEffect(() => {

        const fetchData = async () => {

            try {

                setLoadingData(true);
                setError("");

                const [
                    suppliersResponse,
                    warehousesResponse,
                    productsResponse
                ] = await Promise.all([

                    api.get("/suppliers"),
                    api.get("/warehouses"),
                    api.get("/products")

                ]);


                setSuppliers(
                    suppliersResponse.data.data || []
                );

                setWarehouses(
                    warehousesResponse.data.data || []
                );

                setProducts(
                    productsResponse.data.data || []
                );


            } catch (error) {

                console.error(
                    "Error loading purchase order data:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load suppliers, warehouses or products"
                );

            } finally {

                setLoadingData(false);

            }

        };


        fetchData();

    }, []);


    // ==========================================
    // Product Selection
    // ==========================================

    const handleProductChange = (index, productId) => {

        const updatedItems = [...items];

        updatedItems[index].product = productId;


        const selectedProduct = products.find(
            product => product._id === productId
        );


        if (selectedProduct) {

            updatedItems[index].price =
                selectedProduct.purchasePrice || 0;

        }


        setItems(updatedItems);

    };


    // ==========================================
    // Quantity Change
    // ==========================================

    const handleQuantityChange = (index, quantity) => {

        const updatedItems = [...items];

        updatedItems[index].quantity =
            Number(quantity);

        setItems(updatedItems);

    };


    // ==========================================
    // Price Change
    // ==========================================

    const handlePriceChange = (index, price) => {

        const updatedItems = [...items];

        updatedItems[index].price =
            Number(price);

        setItems(updatedItems);

    };


    // ==========================================
    // Add Product Row
    // ==========================================

    const addProductRow = () => {

        setItems([
            ...items,
            {
                product: "",
                quantity: 1,
                price: 0
            }
        ]);

    };


    // ==========================================
    // Remove Product Row
    // ==========================================

    const removeProductRow = (index) => {

        if (items.length === 1) {
            return;
        }


        const updatedItems =
            items.filter(
                (_, itemIndex) =>
                    itemIndex !== index
            );


        setItems(updatedItems);

    };


    // ==========================================
    // Calculate Total
    // ==========================================

    const totalAmount = items.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.quantity || 0) *
                    Number(item.price || 0)
                );

        },
        0
    );


    // ==========================================
    // Submit Purchase Order
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Validate supplier

        if (!supplier) {

            setError("Please select a supplier.");
            return;

        }


        // Validate warehouse

        if (!warehouse) {

            setError("Please select a warehouse.");
            return;

        }


        // Validate products

        const invalidItem = items.some(
            item =>
                !item.product ||
                Number(item.quantity) <= 0 ||
                Number(item.price) < 0
        );


        if (invalidItem) {

            setError(
                "Please select a product and enter valid quantity and price."
            );

            return;

        }


        try {

            setLoading(true);


            const purchaseOrderData = {

                supplier,

                warehouse,

                products: items.map(item => ({

                    product: item.product,

                    quantity: Number(item.quantity),

                    price: Number(item.price)

                })),

                totalAmount

            };


            console.log(
                "Creating Purchase Order:",
                purchaseOrderData
            );


            const response =
                await api.post(
                    "/purchase-orders",
                    purchaseOrderData
                );


            console.log(
                "Purchase Order created:",
                response.data
            );


            setSuccess(
                "Purchase order created successfully!"
            );


            setTimeout(() => {

                navigate("/purchase-orders");

            }, 1000);


        } catch (error) {

            console.error(
                "Error creating purchase order:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to create purchase order"
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Loading
    // ==========================================

    if (loadingData) {

        return (

            <div className="suppliers-page">

                <h1>
                    Create Purchase Order
                </h1>

                <p>
                    Loading data...
                </p>

            </div>

        );

    }


    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="suppliers-page">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h1>
                        Create Purchase Order
                    </h1>

                    <p>
                        Create a new purchase order
                    </p>

                </div>

            </div>


            {/* Error */}

            {error && (

                <div className="error-message">

                    {error}

                </div>

            )}


            {/* Success */}

            {success && (

                <div className="success-message">

                    {success}

                </div>

            )}


            {/* Form */}

            <form
                className="form-card"
                onSubmit={handleSubmit}
            >


                {/* Supplier */}

                <div className="form-group">

                    <label>
                        Supplier
                    </label>

                    <select
                        value={supplier}
                        onChange={(event) =>
                            setSupplier(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Supplier
                        </option>


                        {suppliers.map(
                            supplierItem => (

                                <option
                                    key={
                                        supplierItem._id
                                    }
                                    value={
                                        supplierItem._id
                                    }
                                >

                                    {
                                        supplierItem.supplierName
                                    }

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
                    >

                        <option value="">
                            Select Warehouse
                        </option>


                        {warehouses.map(
                            warehouseItem => (

                                <option
                                    key={
                                        warehouseItem._id
                                    }
                                    value={
                                        warehouseItem._id
                                    }
                                >

                                    {
                                        warehouseItem.warehouseName
                                    }

                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Products */}

                <div className="purchase-products-section">

                    <div className="section-header">

                        <h2>
                            Products
                        </h2>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={addProductRow}
                        >
                            + Add Product
                        </button>

                    </div>


                    {items.map(
                        (item, index) => (

                            <div
                                className="purchase-product-row"
                                key={index}
                            >

                                {/* Product */}

                                <div className="form-group">

                                    <label>
                                        Product
                                    </label>

                                    <select
                                        value={
                                            item.product
                                        }
                                        onChange={(event) =>
                                            handleProductChange(
                                                index,
                                                event.target.value
                                            )
                                        }
                                    >

                                        <option value="">
                                            Select Product
                                        </option>


                                        {products.map(
                                            product => (

                                                <option
                                                    key={
                                                        product._id
                                                    }
                                                    value={
                                                        product._id
                                                    }
                                                >

                                                    {
                                                        product.productName
                                                    }

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
                                        value={
                                            item.quantity
                                        }
                                        onChange={(event) =>
                                            handleQuantityChange(
                                                index,
                                                event.target.value
                                            )
                                        }
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
                                        value={
                                            item.price
                                        }
                                        onChange={(event) =>
                                            handlePriceChange(
                                                index,
                                                event.target.value
                                            )
                                        }
                                    />

                                </div>


                                {/* Item Total */}

                                <div className="form-group">

                                    <label>
                                        Item Total
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            `₹${(
                                                Number(item.quantity || 0) *
                                                Number(item.price || 0)
                                            ).toLocaleString("en-IN")}`
                                        }
                                        readOnly
                                    />

                                </div>


                                {/* Remove */}

                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        removeProductRow(index)
                                    }
                                    disabled={
                                        items.length === 1
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        )
                    )}

                </div>


                {/* Total */}

                <div className="purchase-total">

                    <strong>
                        Total Amount:
                    </strong>

                    <span>
                        ₹{totalAmount.toLocaleString("en-IN")}
                    </span>

                </div>


                {/* Buttons */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() =>
                            navigate("/purchase-orders")
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating..."
                            : "Create Purchase Order"
                        }

                    </button>

                </div>


            </form>

        </div>

    );

}

export default PurchaseOrderAdd;