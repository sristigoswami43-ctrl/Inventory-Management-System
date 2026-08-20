import { Outlet, NavLink } from "react-router-dom";

function MainLayout() {
  return (
    <div className="app-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="sidebar-logo">
          <h2>Cloud ERP</h2>
          <p>Inventory Management</p>
        </div>

        <nav className="sidebar-nav">

          {/* MAIN */}
          <div className="nav-section">

            <p className="nav-title">MAIN</p>

            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>

          </div>


          {/* INVENTORY */}
          <div className="nav-section">

            <p className="nav-title">INVENTORY</p>

            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>

            <NavLink to="/inventory" className="nav-link">
              Inventory
            </NavLink>

            <NavLink to="/warehouses" className="nav-link">
              Warehouses
            </NavLink>

            <NavLink to="/stock-movements" className="nav-link">
              Stock Movements
            </NavLink>

          </div>


          {/* PURCHASING */}
          <div className="nav-section">

            <p className="nav-title">PURCHASING</p>

            <NavLink to="/suppliers" className="nav-link">
              Suppliers
            </NavLink>

            <NavLink to="/purchase-orders" className="nav-link">
              Purchase Orders
            </NavLink>

          </div>


          {/* SALES */}
          <div className="nav-section">

            <p className="nav-title">SALES</p>

            <NavLink to="/customers" className="nav-link">
              Customers
            </NavLink>

            <NavLink to="/sales-orders" className="nav-link">
              Sales Orders
            </NavLink>

            <NavLink to="/invoices" className="nav-link">
              Invoices
            </NavLink>

            <NavLink to="/payments" className="nav-link">
              Payments
            </NavLink>

          </div>


          {/* FINANCE */}
          <div className="nav-section">

            <p className="nav-title">FINANCE</p>

            <NavLink to="/expenses" className="nav-link">
              Expenses
            </NavLink>

            <NavLink to="/accounting" className="nav-link">
              Accounting
            </NavLink>

          </div>

        </nav>


        {/* LOGOUT */}
        <div className="sidebar-bottom">

          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>

        </div>

      </aside>


      {/* MAIN AREA */}
      <div className="main-area">

        {/* TOPBAR */}
        <header className="topbar">

          <div>
            <h3>Inventory Management System</h3>
          </div>

          <div className="user-section">

            <span>🔔</span>

            <span className="user-name">
              Admin
            </span>

          </div>

        </header>


        {/* PAGE CONTENT */}
        <main className="page-content">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default MainLayout;