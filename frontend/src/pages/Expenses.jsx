import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Expenses() {

    const navigate = useNavigate();

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [summary, setSummary] = useState(null);

    // ==========================================
    // Fetch Expenses
    // ==========================================

    useEffect(() => {

        const fetchExpenses = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/expenses");

                console.log(
                    "Expenses API response:",
                    response.data
                );

                setExpenses(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching expenses:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load expenses"
                );

            } finally {

                setLoading(false);

            }

        };

        const fetchSummary = async () => {

        try {

            const response =
                await api.get("/expenses/summary");

            console.log(
                "Expense Summary API response:",
                response.data
            );

            setSummary(
                response.data.data || null
            );

        } catch (error) {

            console.error(
                "Error fetching expense summary:",
                error
            );

        }

    };


        fetchExpenses();
        fetchSummary();

    }, []);

    // ==========================================
    // Delete Expense
    // ==========================================

    const handleDeleteExpense = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this expense?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            setError("");

        await api.delete(`/expenses/${id}`);

        // Remove deleted expense from the current list
        setExpenses((previousExpenses) =>
            previousExpenses.filter(
                (expense) => expense._id !== id
            )
        );

            alert("Expense deleted successfully");

        } catch (error) {

            console.error(
                "Error deleting expense:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete expense"
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
                        Expenses
                    </h1>

                    <p>
                        Manage your expenses
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/expenses/add")
                    }
                >
                    + Create Expense
                </button>

            </div>


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

                <p>
                    Loading expenses...
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


            {summary && (
                <div className="products-table-container">

                    <h2>
                        Expense Summary
                    </h2>

                <div style={{ marginTop: "15px" }}>

                    <h3>
                        Total Expenses
                    </h3>

                    <p
                        style={{
                        fontSize: "24px",
                        fontWeight: "bold"
                        }}
                    >
                ₹
                        {Number(
                            summary.totalExpenses || 0
                        ).toLocaleString("en-IN")}
                    </p>

                </div>

                </div>
            )}


            {summary &&
                summary.categorySummary &&
                Object.keys(summary.categorySummary).length > 0 && (

                    <div
                        className="products-table-container"
                        style={{ marginTop: "20px" }}
                    >

                        <h2>
                            Expenses By Category
                        </h2>

                        <table className="products-table">

                            <thead>

                                <tr>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Amount
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {Object.entries(
                                    summary.categorySummary
                                ).map(
                                    ([category, amount]) => (

                                        <tr key={category}>

                                            <td>
                                                {category}
                                            </td>

                                            <td>
                                                ₹
                                                {Number(
                                                    amount || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>
                )}

            {/* ==================================
                EXPENSE TABLE
            ================================== */}

            {!loading && !error && (

                <>
                    {expenses.length === 0 ? (

                        <p>
                            No expenses found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Expense Title
                                        </th>

                                        <th>
                                            Category
                                        </th>

                                        <th>
                                            Amount
                                        </th>

                                        <th>
                                            Payment Method
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Expense Date
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {expenses.map(
                                        (expense) => (

                                            <tr
                                                key={
                                                    expense._id
                                                }
                                            >

                                                {/* Expense Title */}

                                                <td>

                                                    {
                                                        expense.expenseTitle ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Category */}

                                                <td>

                                                    {
                                                        expense.category ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Amount */}

                                                <td>

                                                    ₹
                                                    {
                                                        Number(
                                                            expense.amount || 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )
                                                    }

                                                </td>


                                                {/* Payment Method */}

                                                <td>

                                                    {
                                                        expense.paymentMethod ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Status */}

                                                <td>

                                                    {
                                                        expense.status ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Expense Date */}

                                                <td>

                                                    {
                                                        expense.expenseDate
                                                            ? new Date(
                                                                expense.expenseDate
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
                                                                `/expenses/${expense._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/expenses/edit/${expense._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeleteExpense(
                                                                expense._id
                                                            )
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

export default Expenses;