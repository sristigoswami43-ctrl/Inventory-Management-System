import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SupplierDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================
    // Fetch Supplier
    // ============================

    useEffect(() => {

        const fetchSupplier = async () => {

            try {

                setLoading(true);
                setError("");

                // We currently have GET /suppliers,
                // so fetch all suppliers and find the selected one.

                const response =
                    await api.get("/suppliers");

                console.log(
                    "Suppliers API response:",
                    response.data
                );

                const suppliers =
                    response.data.data || [];

                const foundSupplier =
                    suppliers.find(
                        (item) => item._id === id
                    );

                if (!foundSupplier) {

                    setError(
                        "Supplier not found"
                    );

                    return;
                }

                setSupplier(foundSupplier);

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


    // ============================
    // Loading
    // ============================

    if (loading) {

        return (

            <div className="supplier-details-page">

                <p>
                    Loading supplier details...
                </p>

            </div>

        );

    }


    // ============================
    // Error
    // ============================

    if (error) {

        return (

            <div className="supplier-details-page">

                <p className="error-message">
                    {error}
                </p>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate("/suppliers")
                    }
                >
                    Back to Suppliers
                </button>

            </div>

        );

    }


    // ============================
    // Supplier Not Found
    // ============================

    if (!supplier) {

        return (

            <div className="supplier-details-page">

                <p>
                    Supplier not found.
                </p>

                <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                        navigate("/suppliers")
                    }
                >
                    Back to Suppliers
                </button>

            </div>

        );

    }


    // ============================
    // Page
    // ============================

    return (

        <div className="supplier-details-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Supplier Details
                    </h1>

                    <p>
                        View supplier information
                    </p>

                </div>

            </div>


            {/* ============================
                DETAILS CARD
            ============================ */}

            <div className="supplier-details-card">


                {/* Supplier Name */}

                <div className="detail-item">

                    <span className="detail-label">
                        Supplier Name
                    </span>

                    <span className="detail-value">
                        {supplier.supplierName}
                    </span>

                </div>


                {/* Company Name */}

                <div className="detail-item">

                    <span className="detail-label">
                        Company Name
                    </span>

                    <span className="detail-value">
                        {supplier.companyName || "N/A"}
                    </span>

                </div>


                {/* Phone */}

                <div className="detail-item">

                    <span className="detail-label">
                        Phone Number
                    </span>

                    <span className="detail-value">
                        {supplier.phoneNumber}
                    </span>

                </div>


                {/* Email */}

                <div className="detail-item">

                    <span className="detail-label">
                        Email
                    </span>

                    <span className="detail-value">
                        {supplier.email || "N/A"}
                    </span>

                </div>


                {/* GST */}

                <div className="detail-item">

                    <span className="detail-label">
                        GST Number
                    </span>

                    <span className="detail-value">
                        {supplier.gstNumber || "N/A"}
                    </span>

                </div>


                {/* Street */}

                <div className="detail-item">

                    <span className="detail-label">
                        Street
                    </span>

                    <span className="detail-value">
                        {supplier.address?.street || "N/A"}
                    </span>

                </div>


                {/* City */}

                <div className="detail-item">

                    <span className="detail-label">
                        City
                    </span>

                    <span className="detail-value">
                        {supplier.address?.city || "N/A"}
                    </span>

                </div>


                {/* State */}

                <div className="detail-item">

                    <span className="detail-label">
                        State
                    </span>

                    <span className="detail-value">
                        {supplier.address?.state || "N/A"}
                    </span>

                </div>


                {/* Pincode */}

                <div className="detail-item">

                    <span className="detail-label">
                        Pincode
                    </span>

                    <span className="detail-value">
                        {supplier.address?.pincode || "N/A"}
                    </span>

                </div>


                {/* Status */}

                <div className="detail-item">

                    <span className="detail-label">
                        Status
                    </span>

                    <span className="detail-value">
                        {supplier.status}
                    </span>

                </div>


                {/* ============================
                    BUTTONS
                ============================ */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/suppliers")
                        }
                    >
                        Back to Suppliers
                    </button>


                    <button
                        type="button"
                        className="primary-button"
                        onClick={() =>
                            navigate(
                                `/suppliers/edit/${supplier._id}`
                            )
                        }
                    >
                        Edit Supplier
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SupplierDetails;