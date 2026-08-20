import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [movementsData, setMovementsData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch dashboard summary
        const dashboardResponse = await api.get("/dashboard");

        // Fetch inventory
        const inventoryResponse = await api.get("/inventory");

        // Fetch stock movements
        const movementsResponse = await api.get("/stock-movement");

        console.log("Dashboard:", dashboardResponse.data);
        console.log("Inventory:", inventoryResponse.data);
        console.log("Stock Movements:", movementsResponse.data);

        setDashboardData(dashboardResponse.data.data || {});
        setInventoryData(inventoryResponse.data.data || []);
        setMovementsData(movementsResponse.data.data || []);
      } catch (err) {
        console.error("Dashboard loading error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Loading state

  if (loading) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state

  if (error) {
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your inventory and business</p>
          </div>
        </div>

        <div className="dashboard-panel">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  
  // Dashboard values
  
  const counts = dashboardData?.counts || {};
  const inventorySummary = dashboardData?.inventory || {};

  const totalProducts = counts.products || 0;
  const totalWarehouses = counts.warehouses || 0;
  const lowStockItems = inventorySummary.lowStockItems || 0;

  // Calculate total inventory quantity
  const totalInventory = inventoryData.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );


  // Low stock products

  const lowStockProducts = inventoryData
    .filter((item) => {
      const minimumStock =
        item.product?.minimumStock || 0;

      const availableStock =
        item.availableStock ?? item.quantity ?? 0;

      return availableStock <= minimumStock;
    })
    .slice(0, 5);


  // Recent stock movements
  
  const recentMovements = [...movementsData]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);


  // Format date
  
  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="dashboard">

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>
            Overview of your inventory and business
          </p>
        </div>
      </div>


      {/* Summary Cards */}
      <div className="dashboard-cards">

        {/* Total Products */}
        <div className="dashboard-card">
          <div className="card-title">
            Total Products
          </div>

          <div className="card-value">
            {totalProducts}
          </div>

          <div className="card-description">
            Products in system
          </div>
        </div>


        {/* Total Inventory */}
        <div className="dashboard-card">
          <div className="card-title">
            Total Inventory
          </div>

          <div className="card-value">
            {totalInventory}
          </div>

          <div className="card-description">
            Items in stock
          </div>
        </div>


        {/* Warehouses */}
        <div className="dashboard-card">
          <div className="card-title">
            Warehouses
          </div>

          <div className="card-value">
            {totalWarehouses}
          </div>

          <div className="card-description">
            Active warehouses
          </div>
        </div>


        {/* Low Stock */}
        <div className="dashboard-card">
          <div className="card-title">
            Low Stock
          </div>

          <div className="card-value">
            {lowStockItems}
          </div>

          <div className="card-description">
            Products need attention
          </div>
        </div>

      </div>


      {/* Dashboard Sections */}
      <div className="dashboard-grid">

        {/* Stock Overview */}
        <div className="dashboard-panel">

          <h2>Stock Overview</h2>

          <div className="stock-placeholder">
            Stock overview chart will appear here
          </div>

        </div>


        {/* Low Stock Products */}
        <div className="dashboard-panel">

          <h2>Low Stock Products</h2>

          {lowStockProducts.length === 0 ? (
            <p>No low stock products.</p>
          ) : (
            lowStockProducts.map((item) => (
              <div
                className="stock-item"
                key={item._id}
              >
                <span>
                  {item.product?.productName ||
                    "Unknown Product"}
                </span>

                <strong>
                  {item.availableStock ??
                    item.quantity ??
                    0}{" "}
                  left
                </strong>
              </div>
            ))
          )}

        </div>

      </div>


      {/* Recent Stock Movements */}
      <div className="dashboard-panel movements-panel">

        <h2>Recent Stock Movements</h2>

        {recentMovements.length === 0 ? (
          <p>No stock movements found.</p>
        ) : (
          <table>

            <thead>
              <tr>
                <th>Product</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Warehouse</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {recentMovements.map((movement) => {

                const quantity =
                  movement.quantity || 0;

                const type =
                  movement.type || "-";

                return (
                  <tr key={movement._id}>

                    <td>
                      {movement.product?.productName ||
                        "Unknown Product"}
                    </td>

                    <td>
                      {type}
                    </td>

                    <td>
                      {type === "OUT"
                        ? `-${quantity}`
                        : type === "IN"
                        ? `+${quantity}`
                        : quantity}
                    </td>

                    <td>
                      {movement.warehouse?.warehouseName ||
                        movement.warehouse?.name ||
                        "Unknown Warehouse"}
                    </td>

                    <td>
                      {formatDate(
                        movement.createdAt
                      )}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Dashboard;