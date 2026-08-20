import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditExpense() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        expenseTitle: "",
        category: "",
        amount: "",
        description: "",
        expenseDate: "",
        paymentMethod: "",
        status: "Paid"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Expense By ID
    // ==========================================

    useEffect(() => {

        const fetchExpense = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/expenses/${id}`);

                console.log(
                    "Expense API response:",
                    response.data
                );

                const expense =
                    response.data.data;

                if (!expense) {
                    setError("Expense not found");
                    return;
                }

                setFormData({
                    expenseTitle:
                        expense.expenseTitle || "",

                    category:
                        expense.category || "",

                    amount:
                        expense.amount ?? "",

                    description:
                        expense.description || "",

                    expenseDate:
                        expense.expenseDate
                            ? new Date(
                                expense.expenseDate
                            )
                                .toISOString()
                                .split("T")[0]
                            : "",

                    paymentMethod:
                        expense.paymentMethod || "",

                    status:
                        expense.status || "Paid"
                });

            } catch (error) {

                console.error(
                    "Error fetching expense:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load expense"
                );

            } finally {

                setLoading(false);

            }

        };

        if (id) {
            fetchExpense();
        }

    }, [id]);


    // ==========================================
    // Handle Input Changes
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    // ==========================================
    // Update Expense
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            const expenseData = {
                ...formData,
                amount: Number(formData.amount)
            };

            await api.put(
                `/expenses/${id}`,
                expenseData
            );

            alert(
                "Expense updated successfully"
            );

            navigate(`/expenses/${id}`);

        } catch (error) {

            console.error(
                "Error updating expense:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update expense"
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <div className="suppliers-page">

                <p>
                    Loading expense...
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
                        Edit Expense
                    </h1>

                    <p>
                        Update expense information
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate(`/expenses/${id}`)
                    }
                >
                    ← Back to Expense
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
                EDIT FORM
            ================================== */}

            <div className="products-table-container">

                <form onSubmit={handleSubmit}>


                    {/* Expense Title */}

                    <div className="form-group">

                        <label>
                            Expense Title
                        </label>

                        <input
                            type="text"
                            name="expenseTitle"
                            value={formData.expenseTitle}
                            onChange={handleChange}
                            placeholder="Enter expense title"
                            required
                        />

                    </div>


                    {/* Category */}

                    <div className="form-group">

                        <label>
                            Category
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Category
                            </option>

                            <option value="Purchase">
                                Purchase
                            </option>

                            <option value="Salary">
                                Salary
                            </option>

                            <option value="Rent">
                                Rent
                            </option>

                            <option value="Utilities">
                                Utilities
                            </option>

                            <option value="Transportation">
                                Transportation
                            </option>

                            <option value="Marketing">
                                Marketing
                            </option>

                            <option value="Maintenance">
                                Maintenance
                            </option>

                            <option value="Office">
                                Office
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    {/* Amount */}

                    <div className="form-group">

                        <label>
                            Amount
                        </label>

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            min="0"
                            step="0.01"
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter expense description"
                            rows="4"
                        />

                    </div>


                    {/* Expense Date */}

                    <div className="form-group">

                        <label>
                            Expense Date
                        </label>

                        <input
                            type="date"
                            name="expenseDate"
                            value={formData.expenseDate}
                            onChange={handleChange}
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
                        >

                            <option value="">
                                Select Payment Method
                            </option>

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

                            <option value="Paid">
                                Paid
                            </option>

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>


                    {/* ==================================
                        BUTTONS
                    ================================== */}

                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Expense"}

                        </button>


                        <button
                            type="button"
                            className="view-button"
                            onClick={() =>
                                navigate(`/expenses/${id}`)
                            }
                            disabled={saving}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditExpense;