import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Payments() {

    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // Initial Load / Fetch Payments
    // ==========================================

    useEffect(() => {

        const fetchPayments = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/payments");

                console.log(
                    "Payments API response:",
                    response.data
                );

                setPayments(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching payments:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load payments"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPayments();

    }, []);


    const handleDeletePayment = async (id) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this payment?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setError("");

        await api.delete(
            `/payments/${id}`
        );

        setPayments((previousPayments) =>
            previousPayments.filter(
                (payment) =>
                    payment._id !== id
            )
        );

        alert(
            "Payment deleted successfully"
        );

    } catch (error) {

        console.error(
            "Error deleting payment:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Failed to delete payment"
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
                        Payments
                    </h1>

                    <p>
                        Manage your payments
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/payments/add")
                    }
                >
                    + Create Payment
                </button>

            </div>


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

                <p>
                    Loading payments...
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
                PAYMENT TABLE
            ================================== */}

            {!loading && !error && (

                <>
                    {payments.length === 0 ? (

                        <p>
                            No payments found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Invoice
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment Method
                                        </th>

                                        <th>
                                            Transaction ID
                                        </th>

                                        <th>
                                            Payment Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {payments.map(
                                        (payment) => (

                                            <tr
                                                key={
                                                    payment._id
                                                }
                                            >

                                                {/* Invoice */}

                                                <td>

                                                    {
                                                        payment.invoice
                                                            ?.invoiceNumber ||
                                                        "Invoice unavailable"
                                                    }

                                                </td>


                                                {/* Customer */}

                                                <td>

                                                    {
                                                        payment.customer
                                                            ?.customerName ||
                                                        "Customer unavailable"
                                                    }

                                                </td>


                                                {/* Amount */}

                                                <td>

                                                    ₹
                                                    {Number(
                                                        payment.amount || 0
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}

                                                </td>


                                                {/* Payment Method */}

                                                <td>

                                                    {
                                                        payment.paymentMethod ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Transaction ID */}

                                                <td>

                                                    {
                                                        payment.transactionId ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Payment Date */}

                                                <td>

                                                    {
                                                        payment.paymentDate
                                                            ? new Date(
                                                                payment.paymentDate
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    {
                                                        payment.status ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Actions */}

                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/payments/${payment._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/payments/edit/${payment._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeletePayment(payment._id)
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

export default Payments;