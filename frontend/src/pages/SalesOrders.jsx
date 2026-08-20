import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function SalesOrders() {

    const navigate = useNavigate();

    const [salesOrders, setSalesOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Initial Load / Fetch Sales Orders
    // ==========================================

    useEffect(() => {

        const fetchSalesOrders = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/sales-orders");

                console.log(
                    "Sales Orders API response:",
                    response.data
                );

                setSalesOrders(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching sales orders:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load sales orders"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchSalesOrders();

    }, []);

    // ==========================================
    // Delete Sales Order
    // ==========================================

    const handleDeleteSalesOrder = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this sales order?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/sales-orders/${id}`
            );

            alert(
                "Sales order deleted successfully"
            );

            // Remove deleted order from the table
            setSalesOrders((previousOrders) =>
                previousOrders.filter(
                    (salesOrder) =>
                        salesOrder._id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting sales order:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete sales order"
            );

        }

    };

    // ==========================================
// Process Sales Order
// ==========================================

const handleProcessSalesOrder = async (id) => {

    const confirmProcess = window.confirm(
        "Are you sure you want to process this sales order?"
    );

    if (!confirmProcess) {
        return;
    }

    try {

        await api.post(
            `/sales-orders/${id}/process`
        );

        alert(
            "Sales order processed successfully"
        );

        // Update the status immediately in the table
        setSalesOrders((previousOrders) =>
            previousOrders.map(
                (salesOrder) =>
                    salesOrder._id === id
                        ? {
                            ...salesOrder,
                            status: "Shipped"
                        }
                        : salesOrder
            )
        );

    } catch (error) {

        console.error(
            "Error processing sales order:",
            error
        );

        alert(
            error.response?.data?.message ||
            "Failed to process sales order"
        );

    }

};

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
                        Sales Orders
                    </h1>

                    <p>
                        Manage your sales orders
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/sales-orders/add")
                    }
                >
                    + Create Sales Order
                </button>

            </div>


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

                <p>
                    Loading sales orders...
                </p>

            )}


            {/* ==================================
                ERROR
            ================================== */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* ==================================
                SALES ORDER TABLE
            ================================== */}

            {!loading && !error && (

                <>
                    {salesOrders.length === 0 ? (

                        <p>
                            No sales orders found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Customer
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

                                    {salesOrders.map(
                                        (salesOrder) => (

                                            <tr
                                                key={
                                                    salesOrder._id
                                                }
                                            >

                                                <td>

                                                    {
                                                        salesOrder.customer
                                                            ?.customerName ||
                                                        "Customer unavailable"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        salesOrder.warehouse
                                                            ?.warehouseName ||
                                                        "Warehouse unavailable"
                                                    }

                                                </td>


                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            salesOrder.totalAmount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        salesOrder.status ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        salesOrder.orderDate
                                                            ? new Date(
                                                                salesOrder.orderDate
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/sales-orders/${salesOrder._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/sales-orders/edit/${salesOrder._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="primary-button"
                                                        onClick={() =>
                                                            handleProcessSalesOrder(
                                                                salesOrder._id
                                                            )
                                                        }
                                                        disabled={
                                                            salesOrder.status === "Shipped" ||
                                                            salesOrder.status === "Delivered" ||
                                                            salesOrder.status === "Cancelled"
                                                        }
                                                    >
                                                        Process
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeleteSalesOrder(
                                                                salesOrder._id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

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

export default SalesOrders;