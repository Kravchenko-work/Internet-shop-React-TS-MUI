import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import Shop from "../pages/Shop/Shop";
import Product from "../pages/Product/Product";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Shop />}/>
            <Route
                path="/product/:id"
                element={<Product/>}
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
