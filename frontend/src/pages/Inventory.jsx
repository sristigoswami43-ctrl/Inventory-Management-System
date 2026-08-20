import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Inventory() {

    const navigate = useNavigate();
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchInventory = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/inventory");

                console.log(
                    "Inventory API response:",
                    response.data
                );

                setInventory(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching inventory:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load inventory"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchInventory();

    }, []);


    return (

        <div className="suppliers-page">

            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Inventory
                    </h1>

                    <p>
                        Monitor and manage your stock levels
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        navigate("/inventory/stock-in")
                    }
                >
                    + Stock In
                </button>

            </div>


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <div className="loading-message">
                    Loading inventory...
                </div>

            )}


            {/* ============================
                ERROR
            ============================ */}

            {error && (

                <div className="error-message">
                    {error}
                </div>

            )}


            {/* ============================
                INVENTORY TABLE
            ============================ */}

            {!loading && !error && (

                <>

                    {inventory.length === 0 ? (

                        <div className="empty-state">

                            <h3>
                                No Inventory Records
                            </h3>

                            <p>
                                There are currently no inventory records available.
                            </p>

                        </div>

                    ) : (

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Product
                                        </th>

                                        <th>
                                            Warehouse
                                        </th>

                                        <th>
                                            Total Stock
                                        </th>

                                        <th>
                                            Reserved
                                        </th>

                                        <th>
                                            Available
                                        </th>

                                        <th>
                                            Last Updated
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {inventory.map(
                                        (item) => (

                                            <tr
                                                key={
                                                    item._id
                                                }
                                            >

                                                {/* PRODUCT */}

                                                <td>

                                                    <strong>
                                                        {
                                                            item.product
                                                                ?.productName ||
                                                            "Unknown Product"
                                                        }
                                                    </strong>

                                                </td>


                                                {/* WAREHOUSE */}

                                                <td>

                                                    {item.warehouse
                                                        ?.warehouseName ? (

                                                        <span>
                                                            {
                                                                item.warehouse
                                                                    .warehouseName
                                                            }
                                                        </span>

                                                    ) : (

                                                        <span className="status-badge inactive">
                                                            Warehouse unavailable
                                                        </span>

                                                    )}

                                                </td>


                                                {/* TOTAL STOCK */}

                                                <td>

                                                    {
                                                        item.quantity ?? 0
                                                    }

                                                </td>


                                                {/* RESERVED */}

                                                <td>

                                                    {
                                                        item.reservedStock ?? 0
                                                    }

                                                </td>


                                                {/* AVAILABLE */}

                                                <td>

                                                    <strong>
                                                        {
                                                            item.availableStock ?? 0
                                                        }
                                                    </strong>

                                                </td>


                                                {/* LAST UPDATED */}

                                                <td>

                                                    {
                                                        item.lastUpdated
                                                            ? new Date(
                                                                item.lastUpdated
                                                            ).toLocaleDateString()
                                                            : "N/A"
                                                    }

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

export default Inventory;