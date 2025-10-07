import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { OrdersPage } from "./pages/OrdersPage";
import { TrackingPage } from "./pages/TrackingPage";

import "./App.css";
import HomePage from "./pages/home/HomePage";
import { Error404 } from "./pages/Error404";

function App() {
    const [cart, setCart] = useState([]);
 
 
  const loadCarts = async () => {
     const response = await axios.get("/api/cart-items?expand=product");
     setCart(response.data);
 };
    useEffect(() => {
       
        loadCarts();
    }, []);

    return (
        <>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Routes>
          <Route index element={<HomePage cart={cart} loadCarts={ loadCarts} />} />
                <Route
                    path="/checkout"
                    element={<CheckoutPage cart={cart} />}
                />
                <Route path="/orders" element={<OrdersPage cart={cart} />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
