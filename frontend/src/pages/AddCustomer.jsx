import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddCustomer() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // Submit customer
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await api.post("/customers", formData);

            // Go back to customers page after successful creation
            navigate("/customers");

        } catch (error) {
            console.error("Error creating customer:", error);

            setError(
                error.response?.data?.message ||
                "Failed to create customer"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="suppliers-page">

            <div className="page-header">
                <div>
                    <h1>Add Customer</h1>
                    <p>Create a new customer</p>
                </div>
            </div>

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            <div className="form-container">

                <form onSubmit={handleSubmit}>

                    {/* Customer Name */}
                    <div className="form-group">
                        <label>
                            Customer Name
                        </label>

                        <input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            placeholder="Enter customer name"
                            required
                        />
                    </div>

                    {/* Company Name */}
                    <div className="form-group">
                        <label>
                            Company Name
                        </label>

                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="Enter company name"
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                        />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                    </div>

                    {/* Address */}
                    <div className="form-group">
                        <label>
                            Address
                        </label>

                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                            rows="3"
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

                    {/* Buttons */}
                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate("/customers")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Adding..."
                                : "Add Customer"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddCustomer;