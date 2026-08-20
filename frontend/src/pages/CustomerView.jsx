import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function CustomerView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    
    useEffect(() => {
        const fetchCustomer = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/customers/${id}`);

            console.log(
                "Customer API response:",
                response.data
            );

            setCustomer(response.data.data);

        } catch (error) {
            console.error(
                "Error fetching customer:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load customer"
            );

        } finally {
            setLoading(false);
        }
    };
        
        if (id) {
            fetchCustomer();
        }

    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="suppliers-page">
                <p>Loading customer...</p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="suppliers-page">
                <p className="error-message">{error}</p>

                <button
                    className="primary-button"
                    onClick={() => navigate("/customers")}
                >
                    Back to Customers
                </button>
            </div>
        );
    }

    // Customer not found
    if (!customer) {
        return (
            <div className="suppliers-page">
                <p>Customer not found.</p>

                <button
                    className="primary-button"
                    onClick={() => navigate("/customers")}
                >
                    Back to Customers
                </button>
            </div>
        );
    }

    return (
        <div className="suppliers-page">

            {/* Page Header */}
            <div className="page-header">

                <div>
                    <h1>Customer Details</h1>
                    <p>View customer information</p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => navigate("/customers")}
                >
                    ← Back to Customers
                </button>

            </div>

            {/* Customer Details */}
            <div className="products-table-container">

                <table className="products-table">

                    <tbody>

                        <tr>
                            <th>Customer Name</th>
                            <td>
                                {customer.customerName || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Company Name</th>
                            <td>
                                {customer.companyName || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Email</th>
                            <td>
                                {customer.email || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Phone Number</th>
                            <td>
                                {customer.phoneNumber || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Address</th>
                            <td>
                                {customer.address || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Status</th>
                            <td>
                                {customer.status || "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Created At</th>
                            <td>
                                {customer.createdAt
                                    ? new Date(
                                        customer.createdAt
                                    ).toLocaleDateString()
                                    : "N/A"}
                            </td>
                        </tr>

                        <tr>
                            <th>Last Updated</th>
                            <td>
                                {customer.updatedAt
                                    ? new Date(
                                        customer.updatedAt
                                    ).toLocaleDateString()
                                    : "N/A"}
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

            {/* Actions */}
            <div style={{ marginTop: "20px" }}>

                <button
                    className="edit-button"
                    onClick={() =>
                        navigate(
                            `/customers/edit/${customer._id}`
                        )
                    }
                >
                    Edit Customer
                </button>

                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/customers")
                    }
                >
                    Back
                </button>

            </div>

        </div>
    );
}

export default CustomerView;