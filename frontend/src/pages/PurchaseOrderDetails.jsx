import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function PurchaseOrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [purchaseOrder, setPurchaseOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPurchaseOrder = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/purchase-orders/${id}`
                );

                console.log(
                    "Purchase Order Details:",
                    response.data
                );

                setPurchaseOrder(response.data.data);

            } catch (error) {
                console.error(
                    "Error fetching purchase order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load purchase order"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchPurchaseOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="suppliers-page">
                <p>Loading purchase order...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="suppliers-page">
                <p className="error-message">
                    {error}
                </p>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/purchase-orders")
                    }
                >
                    Back to Purchase Orders
                </button>
            </div>
        );
    }

    if (!purchaseOrder) {
        return (
            <div className="suppliers-page">
                <p>Purchase order not found.</p>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/purchase-orders")
                    }
                >
                    Back to Purchase Orders
                </button>
            </div>
        );
    }

    return (
        <div className="suppliers-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>
                    <h1>
                        Purchase Order Details
                    </h1>

                    <p>
                        View purchase order information
                    </p>
                </div>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/purchase-orders")
                    }
                >
                    ← Back
                </button>

            </div>


            {/* ORDER INFORMATION */}

            <div className="details-card">

                <h2>Order Information</h2>

                <div className="details-grid">

                    <div>
                        <strong>Purchase Order ID</strong>
                        <p>{purchaseOrder._id}</p>
                    </div>

                    <div>
                        <strong>Status</strong>
                        <p>{purchaseOrder.status}</p>
                    </div>

                    <div>
                        <strong>Supplier</strong>
                        <p>
                            {purchaseOrder.supplier?.supplierName ||
                                "Supplier unavailable"}
                        </p>
                    </div>

                    <div>
                        <strong>Warehouse</strong>
                        <p>
                            {purchaseOrder.warehouse?.warehouseName ||
                                "Warehouse unavailable"}
                        </p>
                    </div>

                    <div>
                        <strong>Order Date</strong>
                        <p>
                            {purchaseOrder.orderDate
                                ? new Date(
                                    purchaseOrder.orderDate
                                ).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>

                    <div>
                        <strong>Total Amount</strong>
                        <p>
                            ₹
                            {Number(
                                purchaseOrder.totalAmount || 0
                            ).toLocaleString("en-IN")}
                        </p>
                    </div>

                </div>

            </div>


            {/* PRODUCTS */}

            <div className="details-card">

                <h2>Products</h2>

                {purchaseOrder.products &&
                purchaseOrder.products.length > 0 ? (

                    <div className="products-table-container">

                        <table className="products-table">

                            <thead>

                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>

                            </thead>

                            <tbody>

                                {purchaseOrder.products.map(
                                    (item, index) => (

                                        <tr key={item._id || index}>

                                            <td>
                                                {item.product?.productName ||
                                                    "Product unavailable"}
                                            </td>

                                            <td>
                                                {item.quantity}
                                            </td>

                                            <td>
                                                ₹
                                                {Number(
                                                    item.price || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            <td>
                                                ₹
                                                {Number(
                                                    (item.quantity || 0) *
                                                    (item.price || 0)
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <p>No products found.</p>

                )}

            </div>


            {/* TOTAL */}

            <div className="details-card total-card">

                <div>
                    <strong>Total Amount</strong>
                </div>

                <div>
                    <strong>
                        ₹
                        {Number(
                            purchaseOrder.totalAmount || 0
                        ).toLocaleString("en-IN")}
                    </strong>
                </div>

            </div>

        </div>
    );
}

export default PurchaseOrderDetails;