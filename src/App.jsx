import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import AddProduct from "./pages/addProduct";
import Product from "./pages/product";
import Context from "./context";
import { useState } from "react";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/product/create",
        element: <AddProduct />,
    },
    {
        path: "/product/:id",
        element: <Product />,
    },
]);

function App() {
    const [state, setState] = useState([
        { name: "book", url: "asdfg", price: 100, id: 11 },
        { name: "book", url: "asdfg", price: 100, id: 11 },
        { name: "book", url: "asdfg", price: 100, id: 11 },
    ]);

    function createProduct(product) {
        setState([...state, product]);
    }

    function editProduct(product) {
        const newProducts = state.map((el) =>
            el.id === product.id ? product : el
        );
        setState(newProducts);
    }

    return (
        <Context.Provider
            value={{ products: state, createProduct, editProduct }}
        >
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
