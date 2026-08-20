import {
    useCallback,
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../services/api";


function Products() {

    const navigate = useNavigate();

    // ============================
    // STATE
    // ============================

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // ============================
    // FETCH PRODUCTS
    // ============================

    const fetchProducts = useCallback(async () => {

        try {

            setLoading(true);

            setError("");


            const response = await api.get(
                "/products"
            );


            console.log(
                "Products API response:",
                response.data
            );


            setProducts(
                response.data.data || []
            );


        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to load products"
            );


        } finally {

            setLoading(false);

        }

    }, []);


    // ============================
    // FETCH PRODUCTS ON PAGE LOAD
    // ============================

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();

    }, [fetchProducts]);


    // ============================
    // DELETE PRODUCT
    // ============================

    const handleDelete = async (product) => {

        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${product.productName}"?`
        );


        // User clicked Cancel

        if (!confirmDelete) {

            return;

        }


        try {

            setError("");


            console.log(
                "Deleting product:",
                product._id
            );


            // DELETE API

            await api.delete(
                `/products/${product._id}`
            );


            alert(
                "Product deleted successfully!"
            );


            // Refresh product list

            fetchProducts();


        } catch (error) {

            console.error(
                "Error deleting product:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Failed to delete product"
            );

        }

    };


    // ============================
    // PAGE
    // ============================

    return (

        <div className="products-page">


            {/* ============================
                PAGE HEADER
            ============================ */}

            <div className="page-header">

                <div>

                    <h1>
                        Products
                    </h1>


                    <p>
                        Manage your products and inventory items
                    </p>

                </div>


                {/* ADD PRODUCT BUTTON */}

                <button
                    type="button"
                    className="primary-button"
                    onClick={() =>
                        navigate("/products/add")
                    }
                >
                    + Add Product
                </button>

            </div>


            {/* ============================
                ERROR MESSAGE
            ============================ */}

            {error && (

                <p className="error-message">
                    {error}
                </p>

            )}


            {/* ============================
                LOADING
            ============================ */}

            {loading && (

                <p>
                    Loading products...
                </p>

            )}


            {/* ============================
                PRODUCT CONTENT
            ============================ */}

            {!loading && !error && (

                <>

                    {/* ============================
                        NO PRODUCTS
                    ============================ */}

                    {products.length === 0 ? (

                        <p>
                            No products found.
                        </p>

                    ) : (

                        /* ============================
                           PRODUCTS TABLE
                        ============================ */

                        <div className="products-table-container">

                            <table className="products-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Product
                                        </th>


                                        <th>
                                            Category
                                        </th>


                                        <th>
                                            Brand
                                        </th>


                                        <th>
                                            Purchase Price
                                        </th>


                                        <th>
                                            Selling Price
                                        </th>


                                        <th>
                                            Quantity
                                        </th>


                                        <th>
                                            Status
                                        </th>


                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {products.map(
                                        (product) => (

                                            <tr
                                                key={product._id}
                                            >

                                                {/* PRODUCT */}

                                                <td>
                                                    {
                                                        product.productName
                                                    }
                                                </td>


                                                {/* CATEGORY */}

                                                <td>
                                                    {
                                                        product.category
                                                    }
                                                </td>


                                                {/* BRAND */}

                                                <td>
                                                    {
                                                        product.brand
                                                    }
                                                </td>


                                                {/* PURCHASE PRICE */}

                                                <td>
                                                    ₹
                                                    {
                                                        product.purchasePrice
                                                    }
                                                </td>


                                                {/* SELLING PRICE */}

                                                <td>
                                                    ₹
                                                    {
                                                        product.sellingPrice
                                                    }
                                                </td>


                                                {/* QUANTITY */}

                                                <td>
                                                    {
                                                        product.quantity
                                                    }
                                                </td>


                                                {/* STATUS */}

                                                <td>
                                                    {
                                                        product.status
                                                    }
                                                </td>


                                                {/* ACTIONS */}

                                                <td>

                                                    <div className="action-buttons">


                                                        {/* ============================
                                                            VIEW
                                                        ============================ */}

                                                        <button
                                                            type="button"
                                                            className="view-button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/products/${product._id}`
                                                                )
                                                            }
                                                        >
                                                            View
                                                        </button>


                                                        {/* ============================
                                                            EDIT
                                                        ============================ */}

                                                        <button
                                                            type="button"
                                                            className="edit-button"
                                                            onClick={() =>
                                                                navigate(
                                                                    `/products/edit/${product._id}`
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </button>


                                                        {/* ============================
                                                            DELETE
                                                        ============================ */}

                                                        <button
                                                            type="button"
                                                            className="delete-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>


                                                    </div>

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


export default Products;