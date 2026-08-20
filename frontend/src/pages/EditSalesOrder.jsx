import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditSalesOrder() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [formData, setFormData] = useState({
        customer: "",
        warehouse: "",
        products: [],
        totalAmount: 0,
        status: "Pending",
        orderDate: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Load Sales Order + Customers + Warehouses
    // + Products
    // ==========================================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    salesOrderResponse,
                    customersResponse,
                    warehousesResponse,
                    productsResponse
                ] = await Promise.all([

                    api.get(`/sales-orders/${id}`),

                    api.get("/customers"),

                    api.get("/warehouses"),

                    api.get("/products")

                ]);

                const salesOrder =
                    salesOrderResponse.data.data;

                setCustomers(
                    customersResponse.data.data || []
                );

                setWarehouses(
                    warehousesResponse.data.data || []
                );

                setProducts(
                    productsResponse.data.data || []
                );

                setFormData({

                    customer:
                        salesOrder.customer?._id ||
                        salesOrder.customer ||
                        "",

                    warehouse:
                        salesOrder.warehouse?._id ||
                        salesOrder.warehouse ||
                        "",

                    products:
                        (salesOrder.products || []).map(
                            (item) => ({

                                product:
                                    item.product?._id ||
                                    item.product ||
                                    "",

                                quantity:
                                    item.quantity || 1,

                                price:
                                    item.price || 0

                            })
                        ),

                    totalAmount:
                        salesOrder.totalAmount || 0,

                    status:
                        salesOrder.status ||
                        "Pending",

                    orderDate:
                        salesOrder.orderDate
                            ? salesOrder.orderDate.substring(0, 10)
                            : ""

                });

            } catch (error) {

                console.error(
                    "Error loading sales order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load sales order"
                );

            } finally {

                setLoading(false);

            }

        };

        if (id) {
            loadData();
        }

    }, [id]);

    // ==========================================
    // Handle Basic Field Changes
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };

    // ==========================================
    // Handle Product Changes
    // ==========================================

    const handleProductChange = (
        index,
        field,
        value
    ) => {

        setFormData((previous) => {

            const updatedProducts =
                [...previous.products];

            updatedProducts[index] = {

                ...updatedProducts[index],

                [field]:
                    field === "quantity" ||
                    field === "price"
                        ? Number(value)
                        : value

            };

            const total =
                updatedProducts.reduce(
                    (sum, item) =>
                        sum +
                        (
                            Number(item.quantity) *
                            Number(item.price)
                        ),
                    0
                );

            return {

                ...previous,

                products: updatedProducts,

                totalAmount: total

            };

        });

    };

    // ==========================================
    // Update Sales Order
    // ==========================================

    const handleUpdateSalesOrder = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            await api.put(
                `/sales-orders/${id}`,
                formData
            );

            alert(
                "Sales order updated successfully"
            );

            navigate("/sales-orders");

        } catch (error) {

            console.error(
                "Error updating sales order:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update sales order"
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
                    Loading sales order...
                </p>

            </div>
        );

    }

    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Edit Sales Order
                    </h1>

                    <p>
                        Update sales order information
                    </p>

                </div>

                <button
                    className="view-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                >
                    ← Back to Sales Orders
                </button>

            </div>


            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            <form
                onSubmit={
                    handleUpdateSalesOrder
                }
            >

                {/* ==================================
                    CUSTOMER
                ================================== */}

                <div className="form-group">

                    <label>
                        Customer
                    </label>

                    <select
                        name="customer"
                        value={formData.customer}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Customer
                        </option>

                        {customers.map(
                            (customer) => (

                                <option
                                    key={customer._id}
                                    value={customer._id}
                                >
                                    {
                                        customer.customerName
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* ==================================
                    WAREHOUSE
                ================================== */}

                <div className="form-group">

                    <label>
                        Warehouse
                    </label>

                    <select
                        name="warehouse"
                        value={formData.warehouse}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select Warehouse
                        </option>

                        {warehouses.map(
                            (warehouse) => (

                                <option
                                    key={warehouse._id}
                                    value={warehouse._id}
                                >
                                    {
                                        warehouse.warehouseName
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* ==================================
                    STATUS
                ================================== */}

                <div className="form-group">

                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="Confirmed">
                            Confirmed
                        </option>

                        <option value="Shipped">
                            Shipped
                        </option>

                        <option value="Delivered">
                            Delivered
                        </option>

                        <option value="Cancelled">
                            Cancelled
                        </option>

                    </select>

                </div>


                {/* ==================================
                    ORDER DATE
                ================================== */}

                <div className="form-group">

                    <label>
                        Order Date
                    </label>

                    <input
                        type="date"
                        name="orderDate"
                        value={formData.orderDate}
                        onChange={handleChange}
                    />

                </div>


                {/* ==================================
                    PRODUCTS
                ================================== */}

                <div style={{ marginTop: "25px" }}>

                    <h2>
                        Products
                    </h2>

                    {formData.products.map(
                        (item, index) => (

                            <div
                                key={index}
                                style={{
                                    marginBottom: "20px"
                                }}
                            >

                                <div className="form-group">

                                    <label>
                                        Product
                                    </label>

                                    <select
                                        value={
                                            item.product
                                        }
                                        onChange={(event) =>
                                            handleProductChange(
                                                index,
                                                "product",
                                                event.target.value
                                            )
                                        }
                                        required
                                    >

                                        <option value="">
                                            Select Product
                                        </option>

                                        {products.map(
                                            (product) => (

                                                <option
                                                    key={
                                                        product._id
                                                    }
                                                    value={
                                                        product._id
                                                    }
                                                >
                                                    {
                                                        product.productName
                                                    }
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>


                                <div className="form-group">

                                    <label>
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        min="1"
                                        value={
                                            item.quantity
                                        }
                                        onChange={(event) =>
                                            handleProductChange(
                                                index,
                                                "quantity",
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>


                                <div className="form-group">

                                    <label>
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={
                                            item.price
                                        }
                                        onChange={(event) =>
                                            handleProductChange(
                                                index,
                                                "price",
                                                event.target.value
                                            )
                                        }
                                        required
                                    />

                                </div>

                            </div>

                        )
                    )}

                </div>


                {/* ==================================
                    TOTAL
                ================================== */}

                <div
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <h3>
                        Total Amount: ₹
                        {
                            Number(
                                formData.totalAmount
                            ).toLocaleString("en-IN")
                        }
                    </h3>

                </div>


                {/* ==================================
                    BUTTONS
                ================================== */}

                <button
                    type="submit"
                    className="primary-button"
                    disabled={saving}
                >
                    {saving
                        ? "Updating..."
                        : "Update Sales Order"
                    }
                </button>


                <button
                    type="button"
                    className="view-button"
                    onClick={() =>
                        navigate("/sales-orders")
                    }
                    style={{
                        marginLeft: "10px"
                    }}
                >
                    Cancel
                </button>

            </form>

        </div>

    );

}

export default EditSalesOrder;