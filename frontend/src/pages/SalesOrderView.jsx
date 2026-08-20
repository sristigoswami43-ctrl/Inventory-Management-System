import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SalesOrderView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [salesOrder, setSalesOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Sales Order By ID
    // ==========================================

    useEffect(() => {

        const fetchSalesOrder = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/sales-orders/${id}`);

                console.log(
                    "Sales Order API response:",
                    response.data
                );

                setSalesOrder(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Error fetching sales order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load sales order"
                );

            } finally {

                setLoading(false);

            }

        };

        if (id) {
            fetchSalesOrder();
        }

    }, [id]);

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <div className="suppliers-page">

                <p>
                    Loading sales order...
                </p>

            </div>
        );

    }

    // ==========================================
    // Error
    // ==========================================

    if (error) {

        return (
            <div className="suppliers-page">

                <p className="error-message">
                    {error}
                </p>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                >
                    Back to Sales Orders
                </button>

            </div>
        );

    }

    // ==========================================
    // Sales Order Not Found
    // ==========================================

    if (!salesOrder) {

        return (
            <div className="suppliers-page">

                <p>
                    Sales order not found.
                </p>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                >
                    Back to Sales Orders
                </button>

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
                        Sales Order Details
                    </h1>

                    <p>
                        View sales order information
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
                SALES ORDER DETAILS
            ================================== */}

            <div className="products-table-container">

                <table className="products-table">

                    <tbody>

                        <tr>

                            <th>
                                Customer
                            </th>

                            <td>
                                {
                                    salesOrder.customer
                                        ?.customerName ||
                                    "Customer unavailable"
                                }
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Warehouse
                            </th>

                            <td>
                                {
                                    salesOrder.warehouse
                                        ?.warehouseName ||
                                    "Warehouse unavailable"
                                }
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Status
                            </th>

                            <td>
                                {
                                    salesOrder.status ||
                                    "N/A"
                                }
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Total Amount
                            </th>

                            <td>

                                ₹
                                {
                                    Number(
                                        salesOrder.totalAmount || 0
                                    ).toLocaleString("en-IN")
                                }

                            </td>

                        </tr>


                        <tr>

                            <th>
                                Order Date
                            </th>

                            <td>

                                {
                                    salesOrder.orderDate
                                        ? new Date(
                                            salesOrder.orderDate
                                        ).toLocaleDateString()
                                        : "N/A"
                                }

                            </td>

                        </tr>


                        <tr>

                            <th>
                                Created At
                            </th>

                            <td>

                                {
                                    salesOrder.createdAt
                                        ? new Date(
                                            salesOrder.createdAt
                                        ).toLocaleDateString()
                                        : "N/A"
                                }

                            </td>

                        </tr>


                        <tr>

                            <th>
                                Last Updated
                            </th>

                            <td>

                                {
                                    salesOrder.updatedAt
                                        ? new Date(
                                            salesOrder.updatedAt
                                        ).toLocaleDateString()
                                        : "N/A"
                                }

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>


            {/* ==================================
                PRODUCTS
            ================================== */}

            <div style={{ marginTop: "25px" }}>

                <h2>
                    Products
                </h2>

                <div className="products-table-container">

                    <table className="products-table">

                        <thead>

                            <tr>

                                <th>
                                    Product
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    Total
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {salesOrder.products?.map(
                                (item, index) => (

                                    <tr key={item._id || index}>

                                        <td>

                                            {
                                                item.product
                                                    ?.productName ||
                                                "Product unavailable"
                                            }

                                        </td>


                                        <td>

                                            {
                                                item.quantity
                                            }

                                        </td>


                                        <td>

                                            ₹
                                            {
                                                Number(
                                                    item.price || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }

                                        </td>


                                        <td>

                                            ₹
                                            {
                                                Number(
                                                    (item.quantity || 0) *
                                                    (item.price || 0)
                                                ).toLocaleString(
                                                    "en-IN"
                                                )
                                            }

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* ==================================
                ACTIONS
            ================================== */}

            <div style={{ marginTop: "20px" }}>

                <button
                    className="edit-button"
                    onClick={() =>
                        navigate(
                            `/sales-orders/edit/${salesOrder._id}`
                        )
                    }
                >
                    Edit Sales Order
                </button>


                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                >
                    Back
                </button>

            </div>

        </div>

    );

}

export default SalesOrderView;