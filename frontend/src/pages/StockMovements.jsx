import { useEffect, useState } from "react";
import api from "../services/api";

const StockMovements = () => {

    const [movements, setMovements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchMovements = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/stock-movement");

                console.log(
                    "Stock Movements API response:",
                    response.data
                );

                setMovements(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching stock movements:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load stock movements"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchMovements();

    }, []);


    return (

        <div className="suppliers-page">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h1>
                        Stock Movements
                    </h1>

                    <p>
                        Track all stock movements and inventory changes
                    </p>

                </div>

            </div>


            {/* Loading */}

            {loading && (

                <p>
                    Loading stock movements...
                </p>

            )}


            {/* Error */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* Table */}

            {!loading && !error && (

                <>
                    {movements.length === 0 ? (

                        <p>
                            No stock movements found.
                        </p>

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
                                            Type
                                        </th>

                                        <th>
                                            Quantity
                                        </th>

                                        <th>
                                            Reference
                                        </th>

                                        <th>
                                            Note
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {movements.map(
                                        (movement) => (

                                            <tr
                                                key={
                                                    movement._id
                                                }
                                            >

                                                {/* Product */}

                                                <td>

                                                    {movement.product
                                                        ? movement.product.productName
                                                        : "Unknown Product"
                                                    }

                                                </td>


                                                {/* Warehouse */}

                                                <td>

                                                    {movement.warehouse
                                                        ? movement.warehouse.warehouseName
                                                        : "Warehouse unavailable"
                                                    }

                                                </td>


                                                {/* Type */}

                                                <td>

                                                    {movement.type}

                                                </td>


                                                {/* Quantity */}

                                                <td>

                                                    {movement.quantity}

                                                </td>


                                                {/* Reference */}

                                                <td>

                                                    {movement.reference ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Note */}

                                                <td>

                                                    {movement.note ||
                                                        "N/A"
                                                    }

                                                </td>


                                                {/* Date */}

                                                <td>

                                                    {movement.createdAt
                                                        ? new Date(
                                                            movement.createdAt
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

};

export default StockMovements;