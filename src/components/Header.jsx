import { Link, NavLink } from "react-router-dom";
// no local hooks required
import LogoWhite from "../assets/images/logo-white.png";
import CartIcon from "../assets/images/icons/cart-icon.png";
import SearchIcon from "../assets/images/icons/search-icon.png";
import "./Header.css";

function Header({ cart = [] }) {
    // compute total quantity from cart prop; derived from props so no local accumulation
    const quantity = Array.isArray(cart)
        ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
        : 0;
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
