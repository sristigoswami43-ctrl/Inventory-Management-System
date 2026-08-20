import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditPayment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [payment, setPayment] = useState(null);

    const [formData, setFormData] = useState({
        amount: "",
        paymentMethod: "UPI",
        transactionId: "",
        paymentDate: "",
        status: "Completed",
        note: ""
    });

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // Fetch Payment
    // ==========================================

    useEffect(() => {

        const fetchPayment = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/payments/${id}`);

                const data =
                    response.data.data;

                setPayment(data);

                setFormData({
                    amount: data.amount || "",
                    paymentMethod:
                        data.paymentMethod || "UPI",
                    transactionId:
                        data.transactionId || "",
                    paymentDate:
                        data.paymentDate
                            ? new Date(data.paymentDate)
                                .toISOString()
                                .split("T")[0]
                            : "",
                    status:
                        data.status || "Completed",
                    note:
                        data.note || ""
                });

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


    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==========================================
    // Update Payment
    // ==========================================

    const handleUpdatePayment = async (event) => {

        event.preventDefault();

        try {

            setSubmitting(true);
            setError("");

            if (
                !formData.amount ||
                Number(formData.amount) <= 0
            ) {

                setError(
                    "Please enter a valid payment amount."
                );

                return;

            }


            const paymentData = {

                amount:
                    Number(formData.amount),

                paymentMethod:
                    formData.paymentMethod,

                transactionId:
                    formData.transactionId,

                paymentDate:
                    formData.paymentDate ||
                    undefined,

                status:
                    formData.status,

                note:
                    formData.note

            };


            console.log(
                "Updating payment:",
                paymentData
            );


            const response =
                await api.put(
                    `/payments/${id}`,
                    paymentData
                );


            console.log(
                "Update payment response:",
                response.data
            );


            alert(
                "Payment updated successfully"
            );


            navigate(
                `/payments/${id}`
            );

        } catch (error) {

            console.error(
                "Error updating payment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update payment"
            );

        } finally {

            setSubmitting(false);

        }

    };


    if (loading) {

        return (
            <div className="suppliers-page">
                <p>Loading payment...</p>
            </div>
        );

    }


    if (!payment) {

        return (
            <div className="suppliers-page">

                <p className="error-message">
                    {error || "Payment not found"}
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
                        Edit Payment
                    </h1>

                    <p>
                        Update payment information
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


            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            <div className="products-table-container">

                <form
                    onSubmit={handleUpdatePayment}
                    style={{
                        padding: "20px"
                    }}
                >

                    {/* Invoice */}

                    <div className="form-group">

                        <label>
                            Invoice
                        </label>

                        <input
                            type="text"
                            value={
                                payment.invoice
                                    ?.invoiceNumber ||
                                "Invoice unavailable"
                            }
                            readOnly
                        />

                    </div>


                    {/* Customer */}

                    <div className="form-group">

                        <label>
                            Customer
                        </label>

                        <input
                            type="text"
                            value={
                                payment.customer
                                    ?.customerName ||
                                "Customer unavailable"
                            }
                            readOnly
                        />

                    </div>


                    {/* Amount */}

                    <div className="form-group">

                        <label>
                            Payment Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            min="0.01"
                            step="0.01"
                            required
                        />

                    </div>


                    {/* Payment Method */}

                    <div className="form-group">

                        <label>
                            Payment Method
                        </label>

                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="Card">
                                Card
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                            <option value="Cheque">
                                Cheque
                            </option>

                        </select>

                    </div>


                    {/* Transaction ID */}

                    <div className="form-group">

                        <label>
                            Transaction ID
                        </label>

                        <input
                            type="text"
                            name="transactionId"
                            value={formData.transactionId}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Payment Date */}

                    <div className="form-group">

                        <label>
                            Payment Date
                        </label>

                        <input
                            type="date"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Status */}

                    <div className="form-group">

                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Failed">
                                Failed
                            </option>

                        </select>

                    </div>


                    {/* Note */}

                    <div className="form-group">

                        <label>
                            Note
                        </label>

                        <textarea
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            rows="4"
                        />

                    </div>


                    <div style={{
                        marginTop: "20px"
                    }}>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={submitting}
                        >

                            {submitting
                                ? "Updating..."
                                : "Update Payment"}

                        </button>


                        <button
                            type="button"
                            className="view-button"
                            onClick={() =>
                                navigate("/payments")
                            }
                            style={{
                                marginLeft: "10px"
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditPayment;