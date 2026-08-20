import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditInvoice() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);

    const [formData, setFormData] = useState({
        invoiceNumber: "",
        tax: 0,
        discount: 0,
        status: "Unpaid",
        dueDate: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Invoice
    // ==========================================

    useEffect(() => {

        const fetchInvoice = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/invoices/${id}`);

                const data =
                    response.data.data;

                setInvoice(data);

                setFormData({

                    invoiceNumber:
                        data.invoiceNumber || "",

                    tax:
                        data.tax || 0,

                    discount:
                        data.discount || 0,

                    status:
                        data.status || "Unpaid",

                    dueDate:
                        data.dueDate
                            ? data.dueDate.substring(0, 10)
                            : ""

                });

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
    // Update Invoice
    // ==========================================

    const handleUpdateInvoice = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            const tax =
                Number(formData.tax || 0);

            const discount =
                Number(formData.discount || 0);

            const subtotal =
                Number(invoice.subtotal || 0);

            const totalAmount =
                Math.max(
                    subtotal + tax - discount,
                    0
                );


            const updateData = {

                invoiceNumber:
                    formData.invoiceNumber.trim(),

                tax:

                    tax,

                discount:

                    discount,

                totalAmount:

                    totalAmount,

                status:

                    formData.status,

                dueDate:

                    formData.dueDate || undefined

            };


            console.log(
                "Updating invoice:",
                updateData
            );


            await api.put(
                `/invoices/${id}`,
                updateData
            );


            alert(
                "Invoice updated successfully!"
            );


            navigate(
                `/invoices/${id}`
            );

        } catch (error) {

            console.error(
                "Error updating invoice:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update invoice"
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="suppliers-page">

                <p>
                    Loading invoice...
                </p>

            </div>

        );

    }


    if (error && !invoice) {

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


    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Edit Invoice
                    </h1>

                    <p>
                        {invoice?.invoiceNumber}
                    </p>

                </div>

            </div>


            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            <form
                onSubmit={handleUpdateInvoice}
                className="form-container"
            >

                {/* Invoice Number */}

                <div className="form-group">

                    <label>
                        Invoice Number
                    </label>

                    <input
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* Sales Order */}

                <div className="form-group">

                    <label>
                        Sales Order
                    </label>

                    <input
                        type="text"
                        value={
                            invoice?.salesOrder?._id ||
                            "Unavailable"
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
                            invoice?.customer?.customerName ||
                            "Unavailable"
                        }
                        readOnly
                    />

                </div>


                {/* Subtotal */}

                <div className="form-group">

                    <label>
                        Subtotal
                    </label>

                    <input
                        type="number"
                        value={
                            invoice?.subtotal || 0
                        }
                        readOnly
                    />

                </div>


                {/* Tax */}

                <div className="form-group">

                    <label>
                        Tax Amount
                    </label>

                    <input
                        type="number"
                        name="tax"
                        value={formData.tax}
                        onChange={handleChange}
                        min="0"
                    />

                </div>


                {/* Discount */}

                <div className="form-group">

                    <label>
                        Discount Amount
                    </label>

                    <input
                        type="number"
                        name="discount"
                        value={formData.discount}
                        onChange={handleChange}
                        min="0"
                    />

                </div>


                {/* Total */}

                <div className="form-group">

                    <label>
                        Total Amount
                    </label>

                    <input
                        type="number"
                        value={
                            Math.max(
                                Number(
                                    invoice?.subtotal || 0
                                ) +
                                Number(
                                    formData.tax || 0
                                ) -
                                Number(
                                    formData.discount || 0
                                ),
                                0
                            )
                        }
                        readOnly
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
                    >

                        <option value="Unpaid">
                            Unpaid
                        </option>

                        <option value="Partially Paid">
                            Partially Paid
                        </option>

                        <option value="Paid">
                            Paid
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>


                {/* Due Date */}

                <div className="form-group">

                    <label>
                        Due Date
                    </label>

                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                    />

                </div>


                {/* Buttons */}

                <div className="form-actions">

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={saving}
                    >

                        {saving
                            ? "Updating..."
                            : "Update Invoice"
                        }

                    </button>


                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/invoices")
                        }
                    >

                        Cancel

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditInvoice;