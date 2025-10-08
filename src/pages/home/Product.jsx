import axios from "axios";
import { useState, useRef } from "react";
import { formatMoney } from "../../utils/money";
import Checkmark from "../../assets/images/icons/checkmark.png";
import RatingStars from "../../components/RatingStars";

function Product({ product, loadCarts }) {
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const timerRef = useRef(null);

    const addToCart = async () => {
        const qty = Number(quantity) || 1;
        setAdding(true);
        try {
            await axios.post("/api/cart-items", {
                productId: product.id,
                quantity: qty,
            });
            await loadCarts();

            // show the 'Added' indicator for 2 seconds
            setJustAdded(true);
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => setJustAdded(false), 2000);
        } catch (err) {
            console.error("Add to cart failed", err);
            const serverMsg = err?.response?.data || err?.message;
            alert(
                "Failed to add to cart: " +
                    (serverMsg?.message || JSON.stringify(serverMsg))
            );
        } finally {
            setAdding(false);
        }
    };

    const selectQuantity = (event) => {
        const selectedQuantity = Number(event.target.value);
        setQuantity(selectedQuantity);
    };
    return (
      <div className="product-container"
      data-testid = "product-container">
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.image}
                    data-testid="product-image"
                />
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
                <select value={quantity} onChange={selectQuantity}>
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

            {justAdded && (
                <div className="added-to-cart">
                    <img src={Checkmark} />
                    Added
                </div>
            )}

            <button
                data-testid="add-to-cart-button"
                onClick={addToCart}
                disabled={adding}
                className="add-to-cart-button button-primary">
                {adding ? "Adding..." : "Add to Cart"}
            </button>
        </div>
    );
}

export { Product };
