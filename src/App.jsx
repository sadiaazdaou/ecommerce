import { Routes, Route } from "react-router";
import CheckoutPage from "./pages/CheckoutPage";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
            </Routes>
            <HomePage />
        </>
    );
}

export default App;
