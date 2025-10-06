import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import Checkmark from "../assets/images/icons/checkmark.png";
import RatingStars from "../components/RatingStars";
import { formatMoney } from "../utils/money";

function HomePage({ cart }) {
    console.log(formatMoney("20"));
    const [products, setProducts] = useState([]);
    // const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get("/api/products").then((response) => {
            setProducts(response.data);
        });
        //fetch request
        // fetch("http://localhost:3000/api/products")
        //     .then((res) => res.json())
        //     .then((data) => {
        //         setProducts(data);
        //         console.log(data);
        //     })
        //     .catch((err) => console.log(err));
        // axios.get("/api/cart-items").then((response) => {
        //     setCart(response.data);
        //     console.log(response.data);
        // });
    }, []);

    const productsList = products.map((product) => {
        return (
            <div key={product.id} className="product-container">
                <div className="product-image-container">
                    <img className="product-image" src={product.image} />
                </div>

                <div className="product-name limit-text-to-2-lines">
                    {product.name}
                </div>

                <div className="product-rating-container">
                    <RatingStars value={product.rating.stars} size={18} />
                    {/* <img
                className="product-rating-stars"
                src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    /> */}
                    <div className="product-rating-count link-primary">
                        {product.rating.count}
                    </div>
                </div>

                <div className="product-price">
                    {formatMoney(product.priceCents)}
                </div>

                <div className="product-quantity-container">
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div className="product-spacer"></div>

                <div className="added-to-cart">
                    <img src={Checkmark} />
                    Added
                </div>

                <button className="add-to-cart-button button-primary">
                    Add to Cart
                </button>
            </div>
        );
    });

    return (
        <>
            <title>Ecommerce Project</title>
            <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />
            <Header cart={cart} />

            <div className="home-page">
                <div className="products-grid">{productsList}</div>
            </div>
        </>
    );
}

export default HomePage;
