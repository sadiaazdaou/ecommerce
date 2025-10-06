import { Link } from 'react-router'
import Logo from '../../assets/images/logo.png'
import MobileLogo from "../../assets/images/mobile-logo.png";
import CheckoutLockIcon from "../../assets/images/icons/checkout-lock-icon.png";
import "./CheckoutHeader.css"

function CheckoutHeader({ cart }) {
    console.log(cart)
    var quantity = 0
    cart.forEach(cartItem => quantity += cartItem.quantity)
    console.log(quantity)
    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src={Logo} />
                            <img className="mobile-logo" src={MobileLogo} />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (
                        <Link className="return-to-home-link" to="/">
                            { quantity} items
                        </Link>
                        )
                    </div>

                    <div className="checkout-header-right-section">
                        <img src={CheckoutLockIcon} />
                    </div>
                </div>
            </div>
        </>
    );
}

export { CheckoutHeader };
