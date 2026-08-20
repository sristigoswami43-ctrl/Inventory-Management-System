import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateExpense() {

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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
    // Create Expense
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setError("");

            const expenseData = {
                ...formData,
                amount: Number(formData.amount)
            };

            await api.post(
                "/expenses",
                expenseData
            );

            alert("Expense created successfully");

            navigate("/expenses");

        } catch (error) {

            console.error(
                "Error creating expense:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create expense"
            );

        } finally {

            setLoading(false);

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
                        Create Expense
                    </h1>

                    <p>
                        Add a new business expense
                    </p>

                </div>

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


                    {/* Buttons */}

                    <div
                        style={{
                            marginTop: "20px"
                        }}
                    >

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create Expense"}

                        </button>


                        <button
                            type="button"
                            className="view-button"
                            onClick={() =>
                                navigate("/expenses")
                            }
                            disabled={loading}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CreateExpense;