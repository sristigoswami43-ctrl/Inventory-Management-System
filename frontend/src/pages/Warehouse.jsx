import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Warehouse() {

    const navigate = useNavigate();

    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================
    // Fetch Warehouses
    // ============================

    useEffect(() => {

        const fetchWarehouses = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/warehouses");

                console.log(
                    "Warehouses API response:",
                    response.data
                );

                setWarehouses(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching warehouses:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load warehouses"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchWarehouses();

    }, []);


    // ============================
    // Delete Warehouse
    // ============================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this warehouse?"
            );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/warehouses/${id}`
            );

            setWarehouses(
                warehouses.filter(
                    (warehouse) =>
                        warehouse._id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error deleting warehouse:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete warehouse"
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
                        Warehouses
                    </h1>

                    <p>
                        Manage your warehouses and warehouse information
                    </p>

                </div>


                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/warehouses/add")
                    }
                >
                    + Add Warehouse
                </button>

            </div>


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <p>
                    Loading warehouses...
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
                WAREHOUSE TABLE
            ============================ */}

            {!loading && !error && (

                <>
                    {warehouses.length === 0 ? (

                        <p>
                            No warehouses found.
                        </p>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Warehouse
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Capacity
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

                                    {warehouses.map(
                                        (warehouse) => (

                                            <tr
                                                key={
                                                    warehouse._id
                                                }
                                            >

                                                <td>
                                                    {
                                                        warehouse.warehouseName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        warehouse.location
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        warehouse.capacity
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        warehouse.status
                                                    }
                                                </td>

                                                <td>

                                                    <button
                                                        className="view-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/warehouses/${warehouse._id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            navigate(
                                                                `/warehouses/edit/${warehouse._id}`
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                warehouse._id
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

export default Warehouse;