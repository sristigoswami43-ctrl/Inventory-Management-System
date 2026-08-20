import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddWarehouse = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        warehouseName: "",
        location: "",
        capacity: "",
        status: "Active"
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await fetch(
                "http://localhost:7001/api/warehouses",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        warehouseName: formData.warehouseName,
                        location: formData.location,
                        capacity: Number(formData.capacity),
                        status: formData.status
                    })
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message || "Failed to add warehouse"
                );

            }


            alert("Warehouse added successfully!");

            navigate("/warehouses");

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="page-container">

            <div className="page-header">

                <h1>Add Warehouse</h1>

                <p>
                    Add a new warehouse to your inventory
                </p>

            </div>


            <div className="form-card">

                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-grid">


                        {/* Warehouse Name */}

                        <div className="form-group">

                            <label>
                                Warehouse Name
                            </label>

                            <input
                                type="text"
                                name="warehouseName"
                                placeholder="Enter warehouse name"
                                value={formData.warehouseName}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Location */}

                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                placeholder="Enter warehouse location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />

                        </div>


                        {/* Capacity */}

                        <div className="form-group">

                            <label>
                                Capacity
                            </label>

                            <input
                                type="number"
                                name="capacity"
                                placeholder="Enter warehouse capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                min="0"
                                required
                            />

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

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                    </div>


                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/warehouses")}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Warehouse"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

};


export default AddWarehouse;