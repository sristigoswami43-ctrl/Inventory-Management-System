import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateInvoice() {

    const navigate = useNavigate();

    const [salesOrders, setSalesOrders] = useState([]);

    const [formData, setFormData] = useState({
        invoiceNumber: "",
        salesOrder: "",
        tax: 0,
        discount: 0,
        dueDate: ""
    });

    const [selectedSalesOrder, setSelectedSalesOrder] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Fetch Sales Orders
    // ==========================================

    useEffect(() => {

        const fetchSalesOrders = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await api.get("/sales-orders");

                setSalesOrders(
                    response.data.data || []
                );

            } catch (error) {

                console.error(
                    "Error fetching sales orders:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load sales orders"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchSalesOrders();

    }, []);


    // ==========================================
    // Handle Input
    // ==========================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==========================================
    // Handle Sales Order Selection
    // ==========================================

    const handleSalesOrderChange = (event) => {

        const salesOrderId = event.target.value;

        setFormData((previous) => ({
            ...previous,
            salesOrder: salesOrderId
        }));

        const order = salesOrders.find(
            (salesOrder) =>
                salesOrder._id === salesOrderId
        );

        setSelectedSalesOrder(order || null);

    };


    // ==========================================
    // Calculate Subtotal
    // ==========================================

    const subtotal =
        selectedSalesOrder?.products?.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0) *
                Number(item.price || 0),
            0
        ) || 0;


    // ==========================================
    // Calculate Total
    // ==========================================

    const tax = Number(formData.tax || 0);

    const discount =
        Number(formData.discount || 0);

    const totalAmount =
        Math.max(
            subtotal + tax - discount,
            0
        );


    // ==========================================
    // Create Invoice
    // ==========================================

    const handleCreateInvoice = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);
            setError("");

            if (!formData.invoiceNumber.trim()) {

                setError(
                    "Please enter an invoice number."
                );

                return;

            }

            if (!formData.salesOrder) {

                setError(
                    "Please select a sales order."
                );

                return;

            }

            if (!selectedSalesOrder) {

                setError(
                    "Selected sales order could not be found."
                );

                return;

            }

            const invoiceProducts =
                selectedSalesOrder.products.map(
                    (item) => ({

                        product: item.product?._id ||
                            item.product,

                        quantity:
                            Number(item.quantity),

                        price:
                            Number(item.price),

                        total:
                            Number(item.quantity) *
                            Number(item.price)

                    })
                );


            const invoiceData = {

                invoiceNumber:
                    formData.invoiceNumber.trim(),

                salesOrder:
                    selectedSalesOrder._id,

                customer:
                    selectedSalesOrder.customer?._id ||
                    selectedSalesOrder.customer,

                products:
                    invoiceProducts,

                subtotal:
                    subtotal,

                tax:
                    tax,

                discount:
                    discount,

                totalAmount:
                    totalAmount,

                dueDate:
                    formData.dueDate || undefined

            };


            console.log(
                "Creating invoice:",
                invoiceData
            );


            await api.post(
                "/invoices",
                invoiceData
            );


            alert(
                "Invoice created successfully!"
            );


            navigate("/invoices");

        } catch (error) {

            console.error(
                "Error creating invoice:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to create invoice"
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================================
    // Page
    // ==========================================

    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Create Invoice
                    </h1>

                    <p>
                        Create a new invoice from a sales order
                    </p>

                </div>

            </div>


            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {loading ? (

                <p>
                    Loading sales orders...
                </p>

            ) : (

                <form
                    onSubmit={handleCreateInvoice}
                    className="form-container"
                >

                    {/* Invoice Number */}

                    <div className="form-group">

                        <label>
                            Invoice Number
                        </label>

                        <input
                            type="text"
                            name="invoiceNumber"
                            value={formData.invoiceNumber}
                            onChange={handleChange}
                            placeholder="Example: INV-1002"
                            required
                        />

                    </div>


                    {/* Sales Order */}

                    <div className="form-group">

                        <label>
                            Sales Order
                        </label>

                        <select
                            name="salesOrder"
                            value={formData.salesOrder}
                            onChange={handleSalesOrderChange}
                            required
                        >

                            <option value="">
                                Select Sales Order
                            </option>

                            {salesOrders.map(
                                (salesOrder) => (

                                    <option
                                        key={
                                            salesOrder._id
                                        }
                                        value={
                                            salesOrder._id
                                        }
                                    >

                                        {salesOrder._id}
                                        {" - "}
                                        ₹
                                        {Number(
                                            salesOrder.totalAmount || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* Customer */}

                    {selectedSalesOrder && (

                        <div className="form-group">

                            <label>
                                Customer
                            </label>

                            <input
                                type="text"
                                value={
                                    selectedSalesOrder.customer
                                        ?.customerName ||
                                    "Customer unavailable"
                                }
                                readOnly
                            />

                        </div>

                    )}


                    {/* Products */}

                    {selectedSalesOrder && (

                        <div className="form-group">

                            <label>
                                Products
                            </label>

                            <div>

                                {selectedSalesOrder.products?.map(
                                    (item, index) => (

                                        <p
                                            key={index}
                                        >

                                            {item.product?.productName ||
                                                "Product"}
                                            {" × "}
                                            {item.quantity}
                                            {" @ ₹"}
                                            {Number(
                                                item.price || 0
                                            ).toLocaleString(
                                                "en-IN"
                                            )}

                                        </p>

                                    )
                                )}

                            </div>

                        </div>

                    )}


                    {/* Subtotal */}

                    <div className="form-group">

                        <label>
                            Subtotal
                        </label>

                        <input
                            type="number"
                            value={subtotal}
                            readOnly
                        />

                    </div>


                    {/* Tax */}

                    <div className="form-group">

                        <label>
                            Tax Amount
                        </label>

                        <input
                            type="number"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                            min="0"
                        />

                    </div>


                    {/* Discount */}

                    <div className="form-group">

                        <label>
                            Discount Amount
                        </label>

                        <input
                            type="number"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            min="0"
                        />

                    </div>


                    {/* Total */}

                    <div className="form-group">

                        <label>
                            Total Amount
                        </label>

                        <input
                            type="number"
                            value={totalAmount}
                            readOnly
                        />

                    </div>


                    {/* Due Date */}

                    <div className="form-group">

                        <label>
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />

                    </div>


                    {/* Buttons */}

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={saving}
                        >

                            {saving
                                ? "Creating..."
                                : "Create Invoice"
                            }

                        </button>


                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                navigate("/invoices")
                            }
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            )}

        </div>

    );

}

export default CreateInvoice;