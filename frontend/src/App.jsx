import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import "./App.css";

// ============================
// Pages
// ============================

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// ============================
// Products
// ============================

import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetail";
import EditProduct from "./pages/EditProduct";

// ============================
// Suppliers
// ============================

import Suppliers from "./pages/Suppliers";
import AddSupplier from "./pages/AddSupplier";
import SupplierDetails from "./pages/SupplierDetails";
import EditSupplier from "./pages/EditSupplier";

// ============================
// Warehouses
// ============================

import Warehouse from "./pages/Warehouse";
import AddWarehouse from "./pages/AddWarehouse";
import WarehouseDetails from "./pages/WarehouseDetails";
import EditWarehouse from "./pages/EditWarehouse";

// Inventory

import Inventory from "./pages/Inventory";
import StockIn from "./pages/StockIn";

//Stock Movements
import StockMovements from "./pages/StockMovements";

//Purchase Orders
import PurchaseOrder from "./pages/PurchaseOrder";
import PurchaseOrderAdd from "./pages/PurchaseOrderAdd";
import PurchaseOrderDetails from "./pages/PurchaseOrderDetails";
import EditPurchaseOrder from "./pages/EditPurchaseOrder";

//Customers
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import CustomerView from "./pages/CustomerView";
import EditCustomer from "./pages/EditCustomer";

//Sales Orders
import SalesOrders from "./pages/SalesOrders";
import SalesOrderView from "./pages/SalesOrderView";
import EditSalesOrder from "./pages/EditSalesOrder";
import AddSalesOrder from "./pages/AddSalesOrder";

//Invoices
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import ViewInvoice from "./pages/ViewInvoice";
import EditInvoice from "./pages/EditInvoice";

//Payments
import Payments from "./pages/Payments";
import CreatePayment from "./pages/CreatePayment";
import ViewPayment from "./pages/ViewPayment";
import EditPayment from "./pages/EditPayment";

//Expenses
import Expenses from "./pages/Expenses";
import CreateExpense from "./pages/CreateExpense";
import ViewExpense from "./pages/ViewExpense";
import EditExpense from "./pages/EditExpense";

//Accounting
import Accounting from "./pages/Accounting";

// ============================
// Components / Layout
// ============================

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ============================
                    DEFAULT PAGE
                ============================ */}

                <Route
                    path="/"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />


                {/* ============================
                    LOGIN
                ============================ */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* ============================
                    REGISTER
                ============================ */}

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ============================
                    PROTECTED ERP ROUTES
                ============================ */}

                <Route
                    element={
                        <ProtectedRoute>
                            <MainLayout />
                        </ProtectedRoute>
                    }
                >

                    {/* ============================
                        DASHBOARD
                    ============================ */}

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />


                    {/* ============================
                        PRODUCTS
                    ============================ */}

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    {/* Add Product */}

                    <Route
                        path="/products/add"
                        element={<AddProduct />}
                    />

                    {/* Product Details */}

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    {/* Edit Product */}

                    <Route
                        path="/products/edit/:id"
                        element={<EditProduct />}
                    />


                    {/* ============================
                        SUPPLIERS
                    ============================ */}

                    <Route
                        path="/suppliers"
                        element={<Suppliers />}
                    />

                    {/* Add Supplier */}

                    <Route
                        path="/suppliers/add"
                        element={<AddSupplier />}
                    />

                    {/* Edit Supplier */}

                    <Route
                        path="/suppliers/edit/:id"
                        element={<EditSupplier />}
                    />

                    {/* Supplier Details */}

                    <Route
                        path="/suppliers/:id"
                        element={<SupplierDetails />}
                    />


                    {/* ============================
                        WAREHOUSES
                    ============================ */}

                    <Route
                        path="/warehouses"
                        element={<Warehouse />}
                    />

                    {/* Add Warehouse */}

                    <Route
                        path="/warehouses/add"
                        element={<AddWarehouse />}
                    />

                    {/* Warehouse Details */}

                    <Route
                        path="/warehouses/:id"
                        element={<WarehouseDetails />}
                    />

                    {/* Edit Warehouse */}

                    <Route
                        path="/warehouses/edit/:id"
                        element={<EditWarehouse />}
                    />

                    {/*INVENTORY*/}

                    <Route
                        path="/inventory"
                        element={<Inventory />}
                    />

                    <Route
                        path="/inventory/stock-in"
                        element={<StockIn />}
                    />

                    {/*Stock Movement*/}
                    
                    <Route
                        path="/stock-movements"
                        element={<StockMovements />}
                    />

                    {/*Purchase Orders*/}

                    <Route
                        path="/purchase-orders"
                        element={<PurchaseOrder />}
                    />

                    <Route
                        path="/purchase-orders/add"
                        element={<PurchaseOrderAdd />}
                    />

                    <Route
                        path="/purchase-orders/:id"
                        element={<PurchaseOrderDetails />}
                    />

                    <Route
                        path="/purchase-orders/edit/:id"
                        element={<EditPurchaseOrder />}
                    />

                    {/*Customers*/}
                    
                    <Route
                        path="/customers"
                        element={<Customers />}
                    />

                    <Route
                        path="/customers/add"
                        element={<AddCustomer />}
                    />

                    <Route
                        path="/customers/:id"
                        element={<CustomerView />}
                    />

                    <Route
                        path="/customers/edit/:id"
                        element={<EditCustomer />}
                    />

                    {/*Sales Orders*/}
                    <Route
                        path="/sales-orders"
                        element={<SalesOrders />}
                    />

                    <Route
                        path="/sales-orders/add"
                        element={<AddSalesOrder />}
                    />

                    <Route
                        path="/sales-orders/:id"
                        element={<SalesOrderView />}
                    />

                    <Route
                        path="/sales-orders/edit/:id"
                        element={<EditSalesOrder />}
                    />

                    {/*Invoices*/}

                    <Route
                        path="/invoices"
                        element={<Invoices />}
                    />

                    <Route
                        path="/invoices/add"
                        element={<CreateInvoice />}
                    />

                    <Route
                        path="/invoices/:id"
                        element={<ViewInvoice />}
                    />

                    <Route
                        path="/invoices/edit/:id"
                        element={<EditInvoice />}
                    />

                    {/*Payments*/}

                    <Route
                        path="/payments"
                        element={<Payments />}
                    />

                    <Route
                        path="/payments/add"
                        element={<CreatePayment />}
                    />

                    <Route
                        path="/payments/edit/:id"
                        element={<EditPayment />}
                    />

                    <Route
                        path="/payments/:id"
                        element={<ViewPayment />}
                    />

                    {/*Expenses*/}
                    <Route
                        path="/expenses"
                        element={<Expenses />}
                    />

                    <Route
                        path="/expenses/add"
                        element={<CreateExpense />}
                    />

                    <Route
                        path="/expenses/:id"
                        element={<ViewExpense />}
                    />

                    <Route
                        path="/expenses/edit/:id"
                        element={<EditExpense />}
                    />

                    {/*Accounting*/}
                    <Route
                        path="/accounting"
                        element={<Accounting />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}


export default App;