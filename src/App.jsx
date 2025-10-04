import { Routes, Route } from "react-router";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage"

import "./App.css";
import HomePage from "./pages/HomePage";
import { Error404 } from "./pages/Error404";

function App() {
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
