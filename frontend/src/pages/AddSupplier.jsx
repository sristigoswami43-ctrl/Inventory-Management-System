import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddSupplier() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        supplierName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        gstNumber: "",
        street: "",
        city: "",
        state: "",
        pincode: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ============================
    // Handle Input Changes
    // ============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };


    // ============================
    // Submit Supplier
    // ============================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            const supplierData = {

                supplierName: formData.supplierName,

                companyName: formData.companyName,

                phoneNumber: formData.phoneNumber,

                email: formData.email,

                gstNumber: formData.gstNumber,

                address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                },

                status: formData.status

            };


            console.log(
                "Sending supplier data:",
                supplierData
            );


            const response = await api.post(
                "/suppliers",
                supplierData
            );


            console.log(
                "Add Supplier API response:",
                response.data
            );


            setSuccess(
                "Supplier added successfully!"
            );


            setTimeout(() => {

                navigate("/suppliers");

            }, 1000);


        } catch (error) {

            console.error(
                "Error adding supplier:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to add supplier"
            );


        } finally {

            setLoading(false);

        }

    };


    // ============================
    // Page
    // ============================

    return (

        <div className="page-container">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Add Supplier
                    </h1>

                    <p>
                        Add a new supplier to your system
                    </p>

                </div>

            </div>


            {/* ============================
                FORM CARD
            ============================ */}

            <div className="form-card">


                {/* Error Message */}

                {error && (

                    <div className="error-message">

                        {error}

                    </div>

                )}


                {/* Success Message */}

                {success && (

                    <div className="success-message">

                        {success}

                    </div>

                )}


                <form onSubmit={handleSubmit}>


                    {/* ============================
                        FORM GRID
                    ============================ */}

                    <div className="form-grid">


                        {/* Supplier Name */}

                        <div className="form-group">

                            <label>
                                Supplier Name
                            </label>

                            <input
                                type="text"
                                name="supplierName"
                                value={formData.supplierName}
                                onChange={handleChange}
                                placeholder="Enter supplier name"
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


                        {/* Phone Number */}

                        <div className="form-group">

                            <label>
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
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
                                placeholder="Enter email"
                            />

                        </div>


                        {/* GST Number */}

                        <div className="form-group">

                            <label>
                                GST Number
                            </label>

                            <input
                                type="text"
                                name="gstNumber"
                                value={formData.gstNumber}
                                onChange={handleChange}
                                placeholder="Enter GST number"
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


                        {/* Street */}

                        <div className="form-group">

                            <label>
                                Street
                            </label>

                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Enter street"
                            />

                        </div>


                        {/* City */}

                        <div className="form-group">

                            <label>
                                City
                            </label>

                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="Enter city"
                            />

                        </div>


                        {/* State */}

                        <div className="form-group">

                            <label>
                                State
                            </label>

                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="Enter state"
                            />

                        </div>


                        {/* Pincode */}

                        <div className="form-group">

                            <label>
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Enter pincode"
                            />

                        </div>


                    </div>


                    {/* ============================
                        BUTTONS
                    ============================ */}

                    <div className="form-actions">


                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/suppliers")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="primary-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding Supplier..."
                                : "Add Supplier"
                            }

                        </button>


                    </div>


                </form>

            </div>

        </div>

    );

}

export default AddSupplier;