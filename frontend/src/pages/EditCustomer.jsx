import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditCustomer() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        customerName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        address: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Customer
    // ==========================================

    useEffect(() => {

        const fetchCustomer = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get(`/customers/${id}`);

                console.log(
                    "Customer API response:",
                    response.data
                );

                const customer =
                    response.data.data;

                setFormData({
                    customerName:
                        customer.customerName || "",

                    companyName:
                        customer.companyName || "",

                    email:
                        customer.email || "",

                    phoneNumber:
                        customer.phoneNumber || "",

                    address:
                        customer.address || "",

                    status:
                        customer.status || "Active"
                });

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

    // ==========================================
    // Handle Input Changes
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    // ==========================================
    // Update Customer
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setError("");

            const response =
                await api.put(
                    `/customers/${id}`,
                    formData
                );

            console.log(
                "Update customer response:",
                response.data
            );

            alert("Customer updated successfully!");

            navigate("/customers");

        } catch (error) {

            console.error(
                "Error updating customer:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update customer"
            );

        } finally {

            setSaving(false);

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (
            <div className="suppliers-page">

                <p>
                    Loading customer...
                </p>

            </div>
        );

    }

    // ==========================================
    // Error
    // ==========================================

    if (error && !formData.customerName) {

        return (
            <div className="suppliers-page">

                <p className="error-message">
                    {error}
                </p>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/customers")
                    }
                >
                    Back to Customers
                </button>

            </div>
        );

    }

    // ==========================================
    // Edit Customer Page
    // ==========================================

    return (

        <div className="suppliers-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>

                    <h1>
                        Edit Customer
                    </h1>

                    <p>
                        Update customer information
                    </p>

                </div>

            </div>


            {/* ERROR */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* FORM */}

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
                        />

                    </div>


                    {/* Phone Number */}

                    <div className="form-group">

                        <label>
                            Phone Number
                        </label>

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
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


                    {/* BUTTONS */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/customers")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : "Update Customer"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditCustomer;