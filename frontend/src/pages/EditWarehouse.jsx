import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const EditWarehouse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        warehouseName: "",
        location: "",
        capacity: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    /* ============================
       Fetch Warehouse
    ============================ */

    useEffect(() => {

        const fetchWarehouse = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/warehouses/${id}`);

                console.log(
                    "Edit Warehouse:",
                    response.data
                );

                const warehouse =
                    response.data.data;

                setFormData({
                    warehouseName:
                        warehouse.warehouseName || "",

                    location:
                        warehouse.location || "",

                    capacity:
                        warehouse.capacity ?? "",

                    status:
                        warehouse.status || "Active"
                });

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
       Handle Change
    ============================ */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    /* ============================
       Handle Submit
    ============================ */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSaving(true);

        try {

            const response =
                await api.put(
                    `/warehouses/${id}`,
                    {
                        warehouseName:
                            formData.warehouseName,

                        location:
                            formData.location,

                        capacity:
                            Number(formData.capacity),

                        status:
                            formData.status
                    }
                );

            console.log(
                "Update Warehouse:",
                response.data
            );

            alert(
                "Warehouse updated successfully!"
            );

            navigate(`/warehouses/${id}`);

        } catch (error) {

            console.error(
                "Error updating warehouse:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update warehouse"
            );

        } finally {

            setSaving(false);

        }

    };


    /* ============================
       Loading
    ============================ */

    if (loading) {

        return (
            <div className="warehouse-edit-page">

                <div className="warehouse-loading">
                    Loading warehouse...
                </div>

            </div>
        );

    }


    /* ============================
       Error
    ============================ */

    if (error && !formData.warehouseName) {

        return (
            <div className="warehouse-edit-page">

                <div className="warehouse-error">

                    <p>{error}</p>

                    <button
                        className="warehouse-secondary-btn"
                        onClick={() =>
                            navigate(
                                `/warehouses/${id}`
                            )
                        }
                    >
                        ← Back to Warehouse
                    </button>

                </div>

            </div>
        );

    }


    /* ============================
       Main UI
    ============================ */

    return (

        <div className="warehouse-edit-page">

            {/* ============================
                Header
            ============================ */}

            <div className="warehouse-edit-header">

                <div>

                    <h1>
                        Edit Warehouse
                    </h1>

                    <p>
                        Update warehouse information
                    </p>

                </div>


                <button
                    type="button"
                    className="warehouse-secondary-btn"
                    onClick={() =>
                        navigate(
                            `/warehouses/${id}`
                        )
                    }
                >
                    ← Back to Warehouse
                </button>

            </div>


            {/* ============================
                Form Card
            ============================ */}

            <div className="warehouse-edit-card">

                {error && (

                    <div className="warehouse-edit-error">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="warehouse-edit-grid">


                        {/* Warehouse Name */}

                        <div className="warehouse-edit-group">

                            <label>
                                Warehouse Name
                            </label>

                            <input
                                type="text"
                                name="warehouseName"
                                placeholder="Enter warehouse name"
                                value={
                                    formData.warehouseName
                                }
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Location */}

                        <div className="warehouse-edit-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Enter warehouse location"
                                value={
                                    formData.location
                                }
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Capacity */}

                        <div className="warehouse-edit-group">

                            <label>
                                Capacity
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                placeholder="Enter warehouse capacity"
                                value={
                                    formData.capacity
                                }
                                onChange={handleChange}
                                min="0"
                                required
                            />

                        </div>


                        {/* Status */}

                        <div className="warehouse-edit-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={handleChange}
                            >

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                    </div>


                    {/* ============================
                        Actions
                    ============================ */}

                    <div className="warehouse-edit-actions">

                        <button
                            type="button"
                            className="warehouse-secondary-btn"
                            onClick={() =>
                                navigate(
                                    `/warehouses/${id}`
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="warehouse-primary-btn"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Warehouse"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};

export default EditWarehouse;