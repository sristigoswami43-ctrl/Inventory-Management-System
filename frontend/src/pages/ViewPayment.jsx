import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ViewPayment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchPayment = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/payments/${id}`);

                console.log(
                    "Payment details:",
                    response.data
                );

                setPayment(response.data.data);

            } catch (error) {

                console.error(
                    "Error fetching payment:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load payment"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPayment();

    }, [id]);


    if (loading) {

        return (
            <div className="suppliers-page">
                <p>Loading payment...</p>
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
                    className="view-button"
                    onClick={() =>
                        navigate("/payments")
                    }
                >
                    Back to Payments
                </button>

            </div>
        );

    }


    if (!payment) {

        return (
            <div className="suppliers-page">

                <p>
                    Payment not found.
                </p>

                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/payments")
                    }
                >
                    Back to Payments
                </button>

            </div>
        );

    }


    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Payment Details
                    </h1>

                    <p>
                        View payment information
                    </p>

                </div>

                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/payments")
                    }
                >
                    ← Back to Payments
                </button>

            </div>


            <div className="products-table-container">

                <div style={{ padding: "25px" }}>

                    <h2>
                        Payment Information
                    </h2>

                    <p>
                        <strong>Payment ID:</strong>{" "}
                        {payment._id}
                    </p>

                    <p>
                        <strong>Invoice:</strong>{" "}
                        {payment.invoice?.invoiceNumber ||
                            "Invoice unavailable"}
                    </p>

                    <p>
                        <strong>Customer:</strong>{" "}
                        {payment.customer?.customerName ||
                            "Customer unavailable"}
                    </p>

                    <p>
                        <strong>Amount:</strong>{" "}
                        ₹
                        {Number(
                            payment.amount || 0
                        ).toLocaleString("en-IN")}
                    </p>

                    <p>
                        <strong>Payment Method:</strong>{" "}
                        {payment.paymentMethod || "N/A"}
                    </p>

                    <p>
                        <strong>Transaction ID:</strong>{" "}
                        {payment.transactionId || "N/A"}
                    </p>

                    <p>
                        <strong>Payment Date:</strong>{" "}
                        {payment.paymentDate
                            ? new Date(
                                payment.paymentDate
                            ).toLocaleDateString()
                            : "N/A"}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {payment.status || "N/A"}
                    </p>

                    <p>
                        <strong>Note:</strong>{" "}
                        {payment.note || "No note"}
                    </p>

                    <div style={{ marginTop: "25px" }}>

                        <button
                            className="edit-button"
                            onClick={() =>
                                navigate(
                                    `/payments/edit/${payment._id}`
                                )
                            }
                        >
                            Edit Payment
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ViewPayment;