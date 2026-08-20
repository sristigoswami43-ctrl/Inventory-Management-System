import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const WarehouseDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [warehouse, setWarehouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        const fetchWarehouse = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/warehouses/${id}`);

                console.log(
                    "Warehouse Details:",
                    response.data
                );

                setWarehouse(response.data.data);

            } catch (error) {

                console.error(
                    "Error fetching warehouse:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load warehouse"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchWarehouse();

    }, [id]);


    /* ============================
       Loading
    ============================ */

    if (loading) {

        return (
            <div className="warehouse-details-page">

                <div className="warehouse-loading">
                    Loading warehouse...
                </div>

            </div>
        );

    }


    /* ============================
       Error
    ============================ */

    if (error) {

        return (
            <div className="warehouse-details-page">

                <div className="warehouse-error">

                    <p>{error}</p>

                    <button
                        className="warehouse-secondary-btn"
                        onClick={() =>
                            navigate("/warehouses")
                        }
                    >
                        ← Back to Warehouses
                    </button>

                </div>

            </div>
        );

    }


    /* ============================
       Warehouse Not Found
    ============================ */

    if (!warehouse) {

        return (
            <div className="warehouse-details-page">

                <div className="warehouse-error">

                    <p>Warehouse not found.</p>

                    <button
                        className="warehouse-secondary-btn"
                        onClick={() =>
                            navigate("/warehouses")
                        }
                    >
                        ← Back to Warehouses
                    </button>

                </div>

            </div>
        );

    }


    /* ============================
       Main Page
    ============================ */

    return (

        <div className="warehouse-details-page">

            {/* ============================
                Header
            ============================ */}

            <div className="warehouse-details-header">

                <div>

                    <h1>
                        Warehouse Details
                    </h1>

                    <p>
                        View warehouse information
                    </p>

                </div>


                <button
                    className="warehouse-secondary-btn"
                    onClick={() =>
                        navigate("/warehouses")
                    }
                >
                    ← Back to Warehouses
                </button>

            </div>


            {/* ============================
                Details Card
            ============================ */}

            <div className="warehouse-details-card">

                <div className="warehouse-details-grid">


                    {/* Warehouse Name */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Warehouse Name
                        </span>

                        <span className="warehouse-detail-value">
                            {warehouse.warehouseName}
                        </span>

                    </div>


                    {/* Location */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Location
                        </span>

                        <span className="warehouse-detail-value">
                            {warehouse.location}
                        </span>

                    </div>


                    {/* Capacity */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Capacity
                        </span>

                        <span className="warehouse-detail-value">
                            {warehouse.capacity}
                        </span>

                    </div>


                    {/* Status */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Status
                        </span>

                        <span
                            className={`warehouse-status ${
                                warehouse.status === "Active"
                                    ? "warehouse-status-active"
                                    : "warehouse-status-inactive"
                            }`}
                        >
                            {warehouse.status}
                        </span>

                    </div>


                    {/* Created At */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Created At
                        </span>

                        <span className="warehouse-detail-value">

                            {warehouse.createdAt
                                ? new Date(
                                    warehouse.createdAt
                                ).toLocaleDateString()
                                : "N/A"
                            }

                        </span>

                    </div>


                    {/* Last Updated */}

                    <div className="warehouse-detail-item">

                        <span className="warehouse-detail-label">
                            Last Updated
                        </span>

                        <span className="warehouse-detail-value">

                            {warehouse.updatedAt
                                ? new Date(
                                    warehouse.updatedAt
                                ).toLocaleDateString()
                                : "N/A"
                            }

                        </span>

                    </div>


                </div>


                {/* ============================
                    Actions
                ============================ */}

                <div className="warehouse-details-actions">

                    <button
                        type="button"
                        className="warehouse-secondary-btn"
                        onClick={() =>
                            navigate("/warehouses")
                        }
                    >
                        Back
                    </button>


                    <button
                        type="button"
                        className="warehouse-primary-btn"
                        onClick={() =>
                            navigate(
                                `/warehouses/edit/${warehouse._id}`
                            )
                        }
                    >
                        Edit Warehouse
                    </button>

                </div>

            </div>

        </div>

    );

};

export default WarehouseDetails;