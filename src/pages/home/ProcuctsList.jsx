// import axios from "axios";
// import { useState } from "react";
// import { formatMoney } from "../../utils/money";
// import Checkmark from "../../assets/images/icons/checkmark.png";
// import RatingStars from "../../components/RatingStars";
import { Product } from "./Product";

function ProductsList({ products = [], loadCarts }) {
    // const [quantity, setQuantity] = useState(0);

    if (!Array.isArray(products) || products.length === 0) {
        return null;
    }

    return (
        <div className="products-grid">
            {products.map((product) => {
                return (
                    <Product
                        key={product.id}
                        product={product}
                        loadCarts={loadCarts}
                    />
                );
            })}
        </div>
    );
}

export { ProductsList };
