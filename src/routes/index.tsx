import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Shop from "../pages/Shop/Shop";
import PageProduct from "../pages/PageProduct/PageProduct";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";

export default () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Shop />}
            />
            <Route
                path="/product/:id"
                element={<PageProduct/>}
            />
            <Route
                path="/cart"
                element={<Cart/>}
            />
            <Route
                path="/order"
                element={<Order/>}
            />
            <Route
                path="*"
                element={<Navigate to="/" replace/>}
            />
        </Routes>
    );
};
