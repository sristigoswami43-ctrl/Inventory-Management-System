import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Invoices() {

    const navigate = useNavigate();

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // Initial Load / Fetch Invoices
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
// Delete Invoice
// ==========================================

const handleDeleteInvoice = async (invoiceId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this invoice?"
    );

    if (!confirmed) {
        return;
    }

    try {

        setError("");

        await api.delete(
            `/invoices/${invoiceId}`
        );

        setInvoices((previousInvoices) =>
            previousInvoices.filter(
                (invoice) =>
                    invoice._id !== invoiceId
            )
        );

        alert(
            "Invoice deleted successfully!"
        );

    } catch (error) {

        console.error(
            "Error deleting invoice:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Failed to delete invoice"
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
                        Invoices
                    </h1>

                    <p>
                        Manage your invoices
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/invoices/add")
                    }
                >
                    + Create Invoice
                </button>

            </div>


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

                <p>
                    Loading invoices...
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
                INVOICE TABLE
            ================================== */}

            {!loading && !error && (

                <>
                    {invoices.length === 0 ? (

                        <p>
                            No invoices found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Invoice Number
                                        </th>

                                        <th>
                                            Customer
                                        </th>

                                        <th>
                                            Sales Order
                                        </th>

                                        <th>
                                            Total Amount
                                        </th>

                                        <th>
                                            Paid
                                        </th>

                                        <th>
                                            Remaining
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Due Date
                                        </th>

                                        <th>
                                            Invoice Date
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {invoices.map(
                                        (invoice) => (

                                            <tr
                                                key={
                                                    invoice._id
                                                }
                                            >

                                                {/* Invoice Number */}

                                                <td>

                                                    {
                                                        invoice.invoiceNumber ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Customer */}

                                                <td>

                                                    {
                                                        invoice.customer
                                                            ?.customerName ||
                                                        "Customer unavailable"
                                                    }

                                                </td>


                                                {/* Sales Order */}

                                                <td>

                                                    {
                                                        invoice.salesOrder
                                                            ? invoice.salesOrder._id
                                                            : "Sales order unavailable"
                                                    }

                                                </td>


                                                {/* Total Amount */}

                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            invoice.totalAmount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                {/* Paid */}

                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            invoice.paidAmount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                {/* Remaining */}

                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            invoice.remainingAmount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    {
                                                        invoice.status ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Due Date */}

                                                <td>

                                                    {
                                                        invoice.dueDate
                                                            ? new Date(
                                                                invoice.dueDate
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

                                                </td>


                                                {/* Invoice Date */}

                                                <td>

                                                    {
                                                        invoice.invoiceDate
                                                            ? new Date(
                                                                invoice.invoiceDate
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

                                                </td>


                                                {/* Actions */}

                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/invoices/${invoice._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/invoices/edit/${invoice._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeleteInvoice(invoice._id)
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

export default Invoices;