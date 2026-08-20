import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Suppliers() {

    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================
    // Fetch Suppliers
    // ============================

    useEffect(() => {

        const fetchSuppliers = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/suppliers");

                console.log(
                    "Suppliers API response:",
                    response.data
                );

                setSuppliers(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching suppliers:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load suppliers"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchSuppliers();

    }, []);

     // DELETE SUPPLIER

    const handleDelete = async (id) => {

        try {

            const confirmed = window.confirm(
                "Are you sure you want to delete this supplier?"
            );

            if (!confirmed) {
                return;
            }

            await api.delete(`/suppliers/${id}`);

            setSuppliers((currentSuppliers) =>
                currentSuppliers.filter(
                    (supplier) =>
                        supplier._id !== id
                )
            );

            alert(
                "Supplier deleted successfully"
            );

        } catch (error) {

            console.error(
                "Error deleting supplier:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete supplier"
            );
        }
    };


    // ============================
    // Page
    // ============================

    return (

        <div className="suppliers-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Suppliers
                    </h1>

                    <p>
                        Manage your suppliers and supplier information
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/suppliers/add")
                    }
                >
                    + Add Supplier
                </button>

            </div>


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <p>
                    Loading suppliers...
                </p>

            )}


            {/* ============================
                ERROR
            ============================ */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* ============================
                SUPPLIER TABLE
            ============================ */}

            {!loading && !error && (

                <>

                    {suppliers.length === 0 ? (

                        <p>
                            No suppliers found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Supplier
                                        </th>

                                        <th>
                                            Company
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            GST Number
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

                                    {suppliers.map(
                                        (supplier) => (

                                            <tr
                                                key={
                                                    supplier._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        supplier.supplierName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        supplier.companyName ||
                                                        "N/A"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        supplier.phoneNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        supplier.email ||
                                                        "N/A"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        supplier.gstNumber ||
                                                        "N/A"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        supplier.status
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/suppliers/${supplier._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/suppliers/edit/${supplier._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(supplier._id)
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

export default Suppliers;