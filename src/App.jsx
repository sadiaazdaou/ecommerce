import { Routes, Route } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
    return (
        <>
            <Routes>
                <Route index element={<HomePage />} />
                <Route
                    path="/checkout"
                    element={
                        <div
                            style={{
                                color: "red",
                                backgroundColor: "blue",
                                zIndex: 99,
                            }}>
                            Test Checkout Page
                        </div>
                    } />
            </Routes>
            <HomePage />
        </>
    );
}

export default App;
