import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PurchaseOrder() {

    const navigate = useNavigate();

    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [receivingId, setReceivingId] = useState(null);


    // ============================
    // Fetch Purchase Orders
    // ============================

    const fetchPurchaseOrders = async () => {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get("/purchase-orders");

            console.log(
                "Purchase Orders API response:",
                response.data
            );

            setPurchaseOrders(
                response.data.data || []
            );

        } catch (error) {

            console.error(
                "Error fetching purchase orders:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load purchase orders"
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================
    // Initial Load
    // ============================

    useEffect(() => {

        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPurchaseOrders();

    }, []);


    // ============================
    // Receive Purchase Order
    // ============================

    const handleReceivePurchaseOrder = async (purchaseOrderId) => {

        const confirmReceive = window.confirm(
            "Are you sure you want to receive this purchase order?"
        );

        if (!confirmReceive) {
            return;
        }


        try {

            setReceivingId(purchaseOrderId);
            setError("");

            const response =
                await api.post(
                    `/purchase-orders/${purchaseOrderId}/receive`
                );

            console.log(
                "Receive Purchase Order response:",
                response.data
            );


            alert(
                "Purchase order received successfully!"
            );


            // Refresh purchase orders
            await fetchPurchaseOrders();


        } catch (error) {

            console.error(
                "Error receiving purchase order:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to receive purchase order"
            );

        } finally {

            setReceivingId(null);

        }

    };

    const handleDeletePurchaseOrder = async (purchaseOrderId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this purchase order?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        setError("");

        await api.delete(
            `/purchase-orders/${purchaseOrderId}`
        );

        alert(
            "Purchase order deleted successfully!"
        );

        await fetchPurchaseOrders();

    } catch (error) {

        console.error(
            "Error deleting purchase order:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Failed to delete purchase order"
        );
    }
    
};

    // ============================
    // Page
    // ============================

    return (

        <div className="suppliers-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Purchase Orders
                    </h1>

                    <p>
                        Manage your purchase orders
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/purchase-orders/add")
                    }
                >
                    + Create Purchase Order
                </button>

            </div>


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <p>
                    Loading purchase orders...
                </p>

            )}


            {/* ============================
                ERROR
            ============================ */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* ============================
                PURCHASE ORDER TABLE
            ============================ */}

            {!loading && !error && (

                <>
                    {purchaseOrders.length === 0 ? (

                        <p>
                            No purchase orders found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Supplier
                                        </th>

                                        <th>
                                            Warehouse
                                        </th>

                                        <th>
                                            Total Amount
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Order Date
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {purchaseOrders.map(
                                        (purchaseOrder) => (

                                            <tr
                                                key={
                                                    purchaseOrder._id
                                                }
                                            >

                                                <td>

                                                    {
                                                        purchaseOrder.supplier
                                                            ?.supplierName ||
                                                        "Supplier unavailable"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        purchaseOrder.warehouse
                                                            ?.warehouseName ||
                                                        "Warehouse unavailable"
                                                    }

                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            purchaseOrder.totalAmount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        purchaseOrder.status
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        purchaseOrder.orderDate
                                                            ? new Date(
                                                                purchaseOrder.orderDate
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

                                                </td>


                                                <td>


                                                    {/* VIEW */}

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/purchase-orders/${purchaseOrder._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    {/* EDIT */}

                                                    {purchaseOrder.status === "Pending" && (
                                                    
                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/purchase-orders/edit/${purchaseOrder._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    
                                                    )}

                                                    {/* RECEIVE */}

                                                    {purchaseOrder.status === "Pending" && (

                                                        <button
                                                            className="receive-button"
                                                            onClick={() =>
                                                                handleReceivePurchaseOrder(
                                                                    purchaseOrder._id
                                                                )
                                                            }
                                                            disabled={
                                                                receivingId ===
                                                                purchaseOrder._id
                                                            }
                                                        >

                                                            {receivingId ===
                                                            purchaseOrder._id
                                                                ? "Receiving..."
                                                                : "Receive"}

                                                        </button>

                                                    )}


                                                    {/* DELETE */}

                                                    {purchaseOrder.status === "Pending" && (

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeletePurchaseOrder(
                                                                purchaseOrder._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </>

            )}

        </div>

    );

}

export default PurchaseOrder;