import { Header } from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import Checkmark from "../../assets/images/icons/checkmark.png";
import RatingStars from "../../components/RatingStars";
import { formatMoney } from "../../utils/money";
import { ProductsList } from "./ProcuctsList";

function HomePage({ cart, loadCarts }) {
    console.log(formatMoney("20"));
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("/api/products").then((response) => {
            setProducts(response.data);
        });
    }, []);

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
                <ProductsList products={products} loadCarts={loadCarts} />
                {/* <div className="products-grid">{productsList}</div> */}
            </div>
        </>
    );
}

export default HomePage;
