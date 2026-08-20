import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditSupplier() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        supplierName: "",
        companyName: "",
        phoneNumber: "",
        email: "",
        gstNumber: "",
        address: "",
        status: "Active"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ========================================
    // LOAD SUPPLIER
    // ========================================

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/suppliers/${id}`
                );

                const supplier = response.data.data;

                if (!supplier) {
                    setError("Supplier not found");
                    return;
                }

                // Handle address whether backend returns
                // a string or an object
                let supplierAddress = "";

                if (typeof supplier.address === "string") {
                    supplierAddress = supplier.address;
                } else if (supplier.address) {
                    supplierAddress =
                        supplier.address.address ||
                        supplier.address.street ||
                        supplier.address.city ||
                        "";
                }

                setFormData({
                    supplierName: supplier.supplierName || "",
                    companyName: supplier.companyName || "",
                    phoneNumber: supplier.phoneNumber || "",
                    email: supplier.email || "",
                    gstNumber: supplier.gstNumber || "",
                    address: supplierAddress,
                    status: supplier.status || "Active"
                });

            } catch (error) {
                console.error(
                    "Error fetching supplier:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load supplier"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchSupplier();
    }, [id]);

    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // ========================================
    // UPDATE SUPPLIER
    // ========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            setError("");

            await api.put(
                `/suppliers/${id}`,
                formData
            );

            alert("Supplier updated successfully!");

            navigate("/suppliers");

        } catch (error) {
            console.error(
                "Error updating supplier:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update supplier"
            );

        } finally {
            setSaving(false);
        }
    };

    // ========================================
    // LOADING
    // ========================================

    if (loading) {
        return (
            <div className="supplier-form-page">

                <div className="page-header">
                    <div>
                        <h1>Edit Supplier</h1>
                        <p>
                            Update supplier information
                        </p>
                    </div>
                </div>

                <div className="form-card">
                    <p>Loading supplier...</p>
                </div>

            </div>
        );
    }

    // ========================================
    // PAGE
    // ========================================

    return (
        <div className="supplier-form-page">

            {/* PAGE HEADER */}

            <div className="page-header">

                <div>
                    <h1>Edit Supplier</h1>

                    <p>
                        Update supplier information
                    </p>
                </div>

            </div>


            {/* FORM CARD */}

            <div className="form-card">

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

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
                                type="text"
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


                        {/* Address */}

                        <div className="form-group full-width">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Enter supplier address"
                                rows="4"
                            />

                        </div>

                    </div>


                    {/* FORM ACTIONS */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/suppliers")
                            }
                            disabled={saving}
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
                                : "Update Supplier"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditSupplier;