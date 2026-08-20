import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreatePayment() {

    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);

    const [formData, setFormData] = useState({
        invoice: "",
        customer: "",
        amount: "",
        paymentMethod: "UPI",
        transactionId: "",
        paymentDate: "",
        status: "Completed",
        note: ""
    });

    const [selectedInvoice, setSelectedInvoice] = useState(null);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");


    // ==========================================
    // Fetch Invoices
    // ==========================================

    useEffect(() => {

        const fetchInvoices = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/invoices");

                console.log(
                    "Invoices API response:",
                    response.data
                );

                setInvoices(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching invoices:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load invoices"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchInvoices();

    }, []);


    // ==========================================
    // Handle Input Change
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==========================================
    // Handle Invoice Selection
    // ==========================================

    const handleInvoiceChange = (event) => {

        const invoiceId = event.target.value;

        const invoice = invoices.find(
            (item) => item._id === invoiceId
        );

        setSelectedInvoice(invoice || null);

        setFormData((previous) => ({
            ...previous,
            invoice: invoiceId,
            customer: invoice?.customer?._id || ""
        }));

    };


    // ==========================================
    // Create Payment
    // ==========================================

    const handleCreatePayment = async (event) => {

        event.preventDefault();

        try {

            setSubmitting(true);
            setError("");

            if (!formData.invoice) {
                setError("Please select an invoice.");
                return;
            }

            if (!formData.customer) {
                setError("Customer information is missing.");
                return;
            }

            if (!formData.amount || Number(formData.amount) <= 0) {
                setError("Please enter a valid payment amount.");
                return;
            }

            if (
                selectedInvoice &&
                Number(formData.amount) >
                Number(
                    selectedInvoice.remainingAmount ??
                    selectedInvoice.totalAmount ??
                    0
                )
            ) {
                setError(
                    "Payment amount cannot exceed the remaining invoice amount."
                );
                return;
            }


            const paymentData = {

                invoice: formData.invoice,

                customer: formData.customer,

                amount: Number(formData.amount),

                paymentMethod:
                    formData.paymentMethod,

                transactionId:
                    formData.transactionId,

                paymentDate:
                    formData.paymentDate || undefined,

                status:
                    formData.status,

                note:
                    formData.note

            };


            console.log(
                "Creating payment:",
                paymentData
            );


            const response =
                await api.post(
                    "/payments",
                    paymentData
                );


            console.log(
                "Create payment response:",
                response.data
            );


            alert(
                "Payment created successfully"
            );


            navigate("/payments");


        } catch (error) {

            console.error(
                "Error creating payment:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create payment"
            );

        } finally {

            setSubmitting(false);

        }

    };


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="suppliers-page">

                <p>
                    Loading invoices...
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
                        Create Payment
                    </h1>

                    <p>
                        Record a payment for an invoice
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

                <form
                    onSubmit={handleCreatePayment}
                    style={{
                        padding: "20px"
                    }}
                >

                    {/* Invoice */}

                    <div className="form-group">

                        <label>
                            Invoice
                        </label>

                        <select
                            name="invoice"
                            value={formData.invoice}
                            onChange={handleInvoiceChange}
                            required
                        >

                            <option value="">
                                Select Invoice
                            </option>

                            {invoices.map(
                                (invoice) => (

                                    <option
                                        key={invoice._id}
                                        value={invoice._id}
                                    >
                                        {invoice.invoiceNumber}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Customer */}

                    <div className="form-group">

                        <label>
                            Customer
                        </label>

                        <input
                            type="text"
                            value={
                                selectedInvoice?.customer
                                    ?.customerName || ""
                            }
                            placeholder="Customer"
                            readOnly
                        />

                    </div>


                    {/* Invoice Amount */}

                    {selectedInvoice && (

                        <>

                            <div className="form-group">

                                <label>
                                    Invoice Total
                                </label>

                                <input
                                    type="text"
                                    value={`₹${Number(
                                        selectedInvoice.totalAmount || 0
                                    ).toLocaleString("en-IN")}`}
                                    readOnly
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Already Paid
                                </label>

                                <input
                                    type="text"
                                    value={`₹${Number(
                                        selectedInvoice.paidAmount || 0
                                    ).toLocaleString("en-IN")}`}
                                    readOnly
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Remaining Amount
                                </label>

                                <input
                                    type="text"
                                    value={`₹${Number(
                                        selectedInvoice.remainingAmount ??
                                        selectedInvoice.totalAmount ??
                                        0
                                    ).toLocaleString("en-IN")}`}
                                    readOnly
                                />

                            </div>

                        </>

                    )}


                    {/* Payment Amount */}

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
                            placeholder="Enter payment amount"
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
                            placeholder="Enter transaction ID"
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
                            placeholder="Optional note"
                            rows="4"
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
                            disabled={submitting}
                        >

                            {submitting
                                ? "Creating..."
                                : "Create Payment"}

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

export default CreatePayment;