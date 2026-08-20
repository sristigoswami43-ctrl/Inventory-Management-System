import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ViewExpense() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
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

                setExpense(
                    response.data.data
                );

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
                        navigate("/expenses")
                    }
                >
                    Back to Expenses
                </button>

            </div>
        );

    }

    // ==========================================
    // Expense Not Found
    // ==========================================

    if (!expense) {

        return (
            <div className="suppliers-page">

                <p>
                    Expense not found.
                </p>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/expenses")
                    }
                >
                    Back to Expenses
                </button>

            </div>
        );

    }

    // ==========================================
    // Format Amount
    // ==========================================

    const formattedAmount =
        Number(
            expense.amount || 0
        ).toLocaleString("en-IN");

    // ==========================================
    // Format Date
    // ==========================================

    const formattedExpenseDate =
        expense.expenseDate
            ? new Date(
                expense.expenseDate
            ).toLocaleDateString("en-IN")
            : "N/A";

    const formattedCreatedAt =
        expense.createdAt
            ? new Date(
                expense.createdAt
            ).toLocaleDateString("en-IN")
            : "N/A";

    const formattedUpdatedAt =
        expense.updatedAt
            ? new Date(
                expense.updatedAt
            ).toLocaleDateString("en-IN")
            : "N/A";

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
                        Expense Details
                    </h1>

                    <p>
                        View expense information
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/expenses")
                    }
                >
                    ← Back to Expenses
                </button>

            </div>


            {/* ==================================
                EXPENSE DETAILS
            ================================== */}

            <div className="products-table-container">

                <table className="products-table">

                    <tbody>

                        <tr>

                            <th>
                                Expense Title
                            </th>

                            <td>
                                {expense.expenseTitle || "N/A"}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Category
                            </th>

                            <td>
                                {expense.category || "N/A"}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Amount
                            </th>

                            <td>
                                ₹{formattedAmount}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Description
                            </th>

                            <td>
                                {expense.description || "N/A"}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Expense Date
                            </th>

                            <td>
                                {formattedExpenseDate}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Payment Method
                            </th>

                            <td>
                                {expense.paymentMethod || "N/A"}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Status
                            </th>

                            <td>
                                {expense.status || "N/A"}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Created By
                            </th>

                            <td>

                                {expense.createdBy?.username ||
                                    expense.createdBy?.name ||
                                    "N/A"}

                            </td>

                        </tr>


                        <tr>

                            <th>
                                Created At
                            </th>

                            <td>
                                {formattedCreatedAt}
                            </td>

                        </tr>


                        <tr>

                            <th>
                                Last Updated
                            </th>

                            <td>
                                {formattedUpdatedAt}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>


            {/* ==================================
                ACTIONS
            ================================== */}

            <div style={{ marginTop: "20px" }}>

                <button
                    className="edit-button"
                    onClick={() =>
                        navigate(
                            `/expenses/edit/${expense._id}`
                        )
                    }
                >
                    Edit Expense
                </button>


                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/expenses")
                    }
                >
                    Back
                </button>

            </div>

        </div>

    );

}

export default ViewExpense;