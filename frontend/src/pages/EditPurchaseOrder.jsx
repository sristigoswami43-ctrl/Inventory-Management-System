import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditPurchaseOrder() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);

    const [supplier, setSupplier] = useState("");
    const [warehouse, setWarehouse] = useState("");

    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // ============================
    // Fetch required data
    // ============================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    purchaseOrderResponse,
                    suppliersResponse,
                    warehousesResponse,
                    productsResponse
                ] = await Promise.all([

                    api.get(`/purchase-orders/${id}`),

                    api.get("/suppliers"),

                    api.get("/warehouses"),

                    api.get("/products")

                ]);


                const purchaseOrder =
                    purchaseOrderResponse.data.data;

                setSuppliers(
                    suppliersResponse.data.data || []
                );

                setWarehouses(
                    warehousesResponse.data.data || []
                );

                setProducts(
                    productsResponse.data.data || []
                );


                // Existing purchase order values

                setSupplier(
                    purchaseOrder.supplier?._id ||
                    purchaseOrder.supplier ||
                    ""
                );

                setWarehouse(
                    purchaseOrder.warehouse?._id ||
                    purchaseOrder.warehouse ||
                    ""
                );


                // Existing product

                if (
                    purchaseOrder.products &&
                    purchaseOrder.products.length > 0
                ) {

                    const firstProduct =
                        purchaseOrder.products[0];

                    setProduct(
                        firstProduct.product?._id ||
                        firstProduct.product ||
                        ""
                    );

                    setQuantity(
                        firstProduct.quantity || ""
                    );

                    setPrice(
                        firstProduct.price || ""
                    );
                }

            } catch (error) {

                console.error(
                    "Error loading purchase order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load purchase order"
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id]);


    // ============================
    // Update Purchase Order
    // ============================

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!supplier) {
            setError("Please select a supplier.");
            return;
        }

        if (!warehouse) {
            setError("Please select a warehouse.");
            return;
        }

        if (!product) {
            setError("Please select a product.");
            return;
        }

        if (!quantity || Number(quantity) <= 0) {
            setError("Please enter a valid quantity.");
            return;
        }

        if (!price || Number(price) <= 0) {
            setError("Please enter a valid price.");
            return;
        }


        try {

            setSaving(true);
            setError("");


            const totalAmount =
                Number(quantity) * Number(price);


            const response =
                await api.put(
                    `/purchase-orders/${id}`,
                    {
                        supplier,
                        warehouse,

                        products: [
                            {
                                product,
                                quantity: Number(quantity),
                                price: Number(price)
                            }
                        ],

                        totalAmount
                    }
                );


            console.log(
                "Updated Purchase Order:",
                response.data
            );


            alert(
                "Purchase order updated successfully!"
            );


            navigate("/purchase-orders");


        } catch (error) {

            console.error(
                "Error updating purchase order:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to update purchase order"
            );

        } finally {

            setSaving(false);

        }

    };


    // ============================
    // Loading
    // ============================

    if (loading) {

        return (
            <div className="suppliers-page">

                <h1>
                    Edit Purchase Order
                </h1>

                <p>
                    Loading purchase order...
                </p>

            </div>
        );

    }


    // ============================
    // Page
    // ============================

    return (

        <div className="suppliers-page">

            <div className="page-header">

                <div>

                    <h1>
                        Edit Purchase Order
                    </h1>

                    <p>
                        Update purchase order details
                    </p>

                </div>

            </div>


            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            <form
                onSubmit={handleSubmit}
                className="form-container"
            >

                {/* Supplier */}

                <div className="form-group">

                    <label>
                        Supplier
                    </label>

                    <select
                        value={supplier}
                        onChange={(event) =>
                            setSupplier(event.target.value)
                        }
                    >

                        <option value="">
                            Select Supplier
                        </option>

                        {suppliers.map(
                            (supplierItem) => (

                                <option
                                    key={supplierItem._id}
                                    value={supplierItem._id}
                                >
                                    {supplierItem.supplierName}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Warehouse */}

                <div className="form-group">

                    <label>
                        Warehouse
                    </label>

                    <select
                        value={warehouse}
                        onChange={(event) =>
                            setWarehouse(event.target.value)
                        }
                    >

                        <option value="">
                            Select Warehouse
                        </option>

                        {warehouses.map(
                            (warehouseItem) => (

                                <option
                                    key={warehouseItem._id}
                                    value={warehouseItem._id}
                                >
                                    {warehouseItem.warehouseName}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Product */}

                <div className="form-group">

                    <label>
                        Product
                    </label>

                    <select
                        value={product}
                        onChange={(event) =>
                            setProduct(event.target.value)
                        }
                    >

                        <option value="">
                            Select Product
                        </option>

                        {products.map(
                            (productItem) => (

                                <option
                                    key={productItem._id}
                                    value={productItem._id}
                                >
                                    {productItem.productName}
                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Quantity */}

                <div className="form-group">

                    <label>
                        Quantity
                    </label>

                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(event) =>
                            setQuantity(event.target.value)
                        }
                        placeholder="Enter quantity"
                    />

                </div>


                {/* Price */}

                <div className="form-group">

                    <label>
                        Price per Unit
                    </label>

                    <input
                        type="number"
                        min="0"
                        value={price}
                        onChange={(event) =>
                            setPrice(event.target.value)
                        }
                        placeholder="Enter price"
                    />

                </div>


                {/* Total */}

                <div className="form-group">

                    <label>
                        Total Amount
                    </label>

                    <input
                        type="text"
                        value={
                            quantity && price
                                ? `₹${(
                                    Number(quantity) *
                                    Number(price)
                                ).toLocaleString("en-IN")}`
                                : "₹0"
                        }
                        readOnly
                    />

                </div>


                {/* Buttons */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                            navigate("/purchase-orders")
                        }
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
                            : "Update Purchase Order"}

                    </button>

                </div>

            </form>

        </div>

    );

}

export default EditPurchaseOrder;