import { Header } from "../components/Header";
import { useEffect, useState } from "react";

import "./HomePage.css";
import Checkmark from "../assets/images/icons/checkmark.png";
import RatingStars from "../components/RatingStars";

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
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
                    
              <div className="product-rating-count link-primary">{ product.rating.count}</div>
                </div>

                <div className="product-price">
                    {(product.priceCents / 100).toFixed(2)}
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
            <Header />

            <div className="home-page">
                <div className="products-grid">
                    {productsList}
                 
                </div>
            </div>
        </>
    );
}

export default HomePage;
