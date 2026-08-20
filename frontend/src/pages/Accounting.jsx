import { useEffect, useState } from "react";
import api from "../services/api";

function Accounting() {

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // Fetch Financial Summary
    // ==========================================

    useEffect(() => {

        const fetchFinancialSummary = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/accounting/summary");

                console.log(
                    "Financial Summary API response:",
                    response.data
                );

                setSummary(
                    response.data.data || null
                );

            } catch (error) {

                console.error(
                    "Error fetching financial summary:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load financial summary"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchFinancialSummary();

    }, []);


    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="suppliers-page">

                <p>
                    Loading financial summary...
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

            </div>

        );

    }


    // ==========================================
    // No Data
    // ==========================================

    if (!summary) {

        return (

            <div className="suppliers-page">

                <p>
                    No financial data available.
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
                        Accounting
                    </h1>

                    <p>
                        Financial summary and overview
                    </p>

                </div>

            </div>


            {/* ==================================
                FINANCIAL SUMMARY
            ================================== */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >


                {/* Total Revenue */}

                <div className="products-table-container">

                    <h3>
                        Total Revenue
                    </h3>

                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                        }}
                    >
                        ₹
                        {Number(
                            summary.totalRevenue || 0
                        ).toLocaleString("en-IN")}
                    </p>

                </div>


                {/* Paid Revenue */}

                <div className="products-table-container">

                    <h3>
                        Paid Revenue
                    </h3>

                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                        }}
                    >
                        ₹
                        {Number(
                            summary.paidRevenue || 0
                        ).toLocaleString("en-IN")}
                    </p>

                </div>


                {/* Outstanding Revenue */}

                <div className="products-table-container">

                    <h3>
                        Outstanding Revenue
                    </h3>

                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                        }}
                    >
                        ₹
                        {Number(
                            summary.outstandingRevenue || 0
                        ).toLocaleString("en-IN")}
                    </p>

                </div>


                {/* Total Expenses */}

                <div className="products-table-container">

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


                {/* Net Profit */}

                <div className="products-table-container">

                    <h3>
                        Net Profit
                    </h3>

                    <p
                        style={{
                            fontSize: "24px",
                            fontWeight: "bold"
                        }}
                    >
                        ₹
                        {Number(
                            summary.netProfit || 0
                        ).toLocaleString("en-IN")}
                    </p>

                </div>

            </div>


            {/* ==================================
                INVOICE SUMMARY
            ================================== */}

            <div className="products-table-container">

                <h2>
                    Invoice Summary
                </h2>

                <table className="products-table">

                    <thead>

                        <tr>

                            <th>
                                Metric
                            </th>

                            <th>
                                Count
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr>

                            <td>
                                Total Invoices
                            </td>

                            <td>
                                {summary.invoiceCount || 0}
                            </td>

                        </tr>

                        <tr>

                            <td>
                                Paid Invoices
                            </td>

                            <td>
                                {summary.paidInvoices || 0}
                            </td>

                        </tr>

                        <tr>

                            <td>
                                Partially Paid Invoices
                            </td>

                            <td>
                                {summary.partiallyPaidInvoices || 0}
                            </td>

                        </tr>

                        <tr>

                            <td>
                                Unpaid Invoices
                            </td>

                            <td>
                                {summary.unpaidInvoices || 0}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>


            {/* ==================================
                EXPENSE CATEGORY SUMMARY
            ================================== */}

            {summary.expenseCategorySummary &&
                Object.keys(
                    summary.expenseCategorySummary
                ).length > 0 && (

                    <div
                        className="products-table-container"
                        style={{
                            marginTop: "20px"
                        }}
                    >

                        <h2>
                            Expense Category Summary
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
                                    summary.expenseCategorySummary
                                ).map(
                                    ([category, amount]) => (

                                        <tr
                                            key={category}
                                        >

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

        </div>

    );

}

export default Accounting;