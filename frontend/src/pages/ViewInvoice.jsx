import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ViewInvoice() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchInvoice = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/invoices/${id}`);

                console.log(
                    "Invoice API response:",
                    response.data
                );

                setInvoice(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Error fetching invoice:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load invoice"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchInvoice();

    }, [id]);


    if (loading) {

        return (
            <div className="suppliers-page">

                <p>
                    Loading invoice...
                </p>

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
                    className="primary-button"
                    onClick={() =>
                        navigate("/invoices")
                    }
                >
                    Back to Invoices
                </button>

            </div>

        );

    }


    if (!invoice) {

        return (

            <div className="suppliers-page">

                <p>
                    Invoice not found.
                </p>

            </div>

        );

    }


    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Invoice Details
                    </h1>

                    <p>
                        {invoice.invoiceNumber}
                    </p>

                </div>

                <button
                    className="secondary-button"
                    onClick={() =>
                        navigate("/invoices")
                    }
                >
                    Back to Invoices
                </button>

            </div>


            <div className="form-container">

                <h2>
                    Invoice Information
                </h2>

                <p>
                    <strong>
                        Invoice Number:
                    </strong>{" "}
                    {invoice.invoiceNumber}
                </p>

                <p>
                    <strong>
                        Customer:
                    </strong>{" "}
                    {invoice.customer?.customerName ||
                        "Customer unavailable"}
                </p>

                <p>
                    <strong>
                        Sales Order:
                    </strong>{" "}
                    {invoice.salesOrder?._id ||
                        "Sales order unavailable"}
                </p>

                <p>
                    <strong>
                        Status:
                    </strong>{" "}
                    {invoice.status}
                </p>

                <p>
                    <strong>
                        Invoice Date:
                    </strong>{" "}
                    {invoice.invoiceDate
                        ? new Date(
                            invoice.invoiceDate
                        ).toLocaleDateString()
                        : "N/A"}
                </p>

                <p>
                    <strong>
                        Due Date:
                    </strong>{" "}
                    {invoice.dueDate
                        ? new Date(
                            invoice.dueDate
                        ).toLocaleDateString()
                        : "N/A"}
                </p>


                <hr />


                <h2>
                    Products
                </h2>

                {invoice.products?.map(
                    (item, index) => (

                        <div key={index}>

                            <p>

                                <strong>
                                    {item.product?.productName ||
                                        "Product"}
                                </strong>

                                {" — Quantity: "}
                                {item.quantity}

                                {" — Price: ₹"}
                                {Number(
                                    item.price || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                                {" — Total: ₹"}
                                {Number(
                                    item.total || 0
                                ).toLocaleString(
                                    "en-IN"
                                )}

                            </p>

                        </div>

                    )
                )}


                <hr />


                <p>
                    <strong>
                        Subtotal:
                    </strong>{" "}
                    ₹
                    {Number(
                        invoice.subtotal || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>
                        Tax:
                    </strong>{" "}
                    ₹
                    {Number(
                        invoice.tax || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>
                        Discount:
                    </strong>{" "}
                    ₹
                    {Number(
                        invoice.discount || 0
                    ).toLocaleString("en-IN")}
                </p>

                <h2>
                    Total: ₹
                    {Number(
                        invoice.totalAmount || 0
                    ).toLocaleString("en-IN")}
                </h2>


                <hr />


                <h2>
                    Payment Summary
                </h2>

                <p>
                    <strong>
                        Paid:
                    </strong>{" "}
                    ₹
                    {Number(
                        invoice.paidAmount || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>
                        Remaining:
                    </strong>{" "}
                    ₹
                    {Number(
                        invoice.remainingAmount || 0
                    ).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>
                        Payment Count:
                    </strong>{" "}
                    {invoice.paymentCount || 0}
                </p>

            </div>

        </div>

    );

}

export default ViewInvoice;