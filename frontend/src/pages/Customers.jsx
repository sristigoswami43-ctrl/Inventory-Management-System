import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Customers() {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ==========================================
    // Initial Load / Fetch Customers
    // ==========================================

    useEffect(() => {

        const fetchCustomers = async () => {
            try {
                setLoading(true);
                setError("");
                
                const response = await api.get("/customers");
                
                console.log( "Customers API response:",
                    response.data
                );
                
                setCustomers(
                    response.data.data || []
                );
            } catch (error) {
                console.error(
                    "Error fetching customers:",
                    error
                );
                
                setError(
                    error.response?.data?.message ||
                    "Failed to load customers"
                );
            } finally {
                setLoading(false);
            }
        };

        
        fetchCustomers();

    }, []);


// ==========================================
// Delete Customer
// ==========================================

const handleDeleteCustomer = async (customerId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        setError("");

        await api.delete(
            `/customers/${customerId}`
        );

        alert("Customer deleted successfully!");

        // Remove deleted customer from the current list
        setCustomers((previousCustomers) =>
            previousCustomers.filter(
                (customer) => customer._id !== customerId
            )
        );

    } catch (error) {

        console.error(
            "Error deleting customer:",
            error
        );

        setError(
            error.response?.data?.message ||
            "Failed to delete customer"
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
                        Customers
                    </h1>

                    <p>
                        Manage your customers
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/customers/add")
                    }
                >
                    + Add Customer
                </button>

            </div>


            {/* ==================================
                LOADING
            ================================== */}

            {loading && (

                <p>
                    Loading customers...
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
                CUSTOMER TABLE
            ================================== */}

            {!loading && !error && (

                <>
                    {customers.length === 0 ? (

                        <p>
                            No customers found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Customer Name
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Address
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {customers.map(
                                        (customer) => (

                                            <tr
                                                key={
                                                    customer._id
                                                }
                                            >

                                                <td>

                                                    {
                                                        customer.customerName ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        customer.companyName ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        customer.email ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        customer.phoneNumber ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        customer.address ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    {
                                                        customer.status ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/customers/${customer._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/customers/edit/${customer._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDeleteCustomer(customer._id)
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

export default Customers;