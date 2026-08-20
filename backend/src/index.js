const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const dbConnect = require("./config/dbConnect.js");

const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

const productRoutes = require("./routes/productRoutes.js");

const dns = require("dns");

dns.setServers(["1.1.1.1"]);

const supplierRoutes = require("./routes/supplierRoutes");

const warehouseRoutes = require("./routes/warehouseRoutes.js");

const inventoryRoutes = require("./routes/inventoryRoutes");

const stockMovementRoutes = require("./routes/stockMovementRoutes");

const purchaseOrderRoutes = require("./routes/purchaseOrderRoutes.js");

const customerRoutes = require("./routes/customerRoutes.js");

const salesOrderRoutes = require("./routes/salesOrderRoutes.js");

const invoiceRoutes = require("./routes/invoiceRoutes.js");

const paymentRoutes = require("./routes/paymentRoutes.js");

const expenseRoutes = require("./routes/expenseRoutes.js");

const accountingRoutes = require("./routes/accountingRoutes.js");

const dashboardRoutes = require("./routes/dashboardRoutes.js");
// Database Connection

dbConnect();

const app = express();

// Middleware
app.use(
    cors({
        origin: "http://localhost:5173"
    })
);
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

// Inventory Product Routes

app.use("/api/products", productRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/warehouses", warehouseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/stock-movement", stockMovementRoutes);
app.use("/api/purchase-orders", purchaseOrderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/sales-orders", salesOrderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/accounting", accountingRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Default Route

app.get("/", (req, res) => {
  res.json({
    message: "Cloud ERP Backend Running",
  });
});

// Start Server

const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
