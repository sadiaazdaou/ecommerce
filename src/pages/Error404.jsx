import "./Error404.css";
import { Link } from "react-router";

function Error404() {
    return (
        <div className="error-page">
            <div className="error-card">
                <div className="error-code">404</div>
                <div className="error-message">We can't find that page</div>
                <div className="error-description">
                    The page you're looking for doesn't exist or has been moved.
                </div>

                <div className="error-actions">
                    <Link to="/" className="button button-primary">
                        Go home
                    </Link>
                    <Link to="/orders" className="button button-secondary">
                        My orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

export { Error404 };
