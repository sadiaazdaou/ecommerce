import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LogoWhite from "../assets/images/logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import "./Header.css";

function Header({ cart = [] }) {
    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        // guard in case cart is empty
        if (Array.isArray(cart) && cart.length > 0) {
            cart.forEach((ele) => {
                setQuantity(prev => prev += ele.quantity);
                console.log(quantity);
            });
        } else {
            console.log("cart is empty or not provided");
        }
    }, [cart]);
    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo" src={LogoWhite} />
                    <img className="mobile-logo" src={LogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                />

                <button className="search-button">
                    <img className="search-icon" src={SearchIcon} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">
                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={CartIcon} />
                    <div className="cart-quantity">{quantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    );
}

export { Header };
