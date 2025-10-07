import { Header } from "../components/Header";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import dayjs, { Dayjs } from "dayjs";
import "./OrdersPage.css";
import BuyAgain from "../assets/images/icons/buy-again.png";
import { formatMoney } from "../utils/money";

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get("/api/orders?expand=products")
            .then((response) => setOrders(response.data));
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />;
            <Header cart={cart} />
            <div class="orders-page">
                <div class="page-title">Your Orders</div>

                <div class="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} class="order-container">
                                <div class="order-header">
                                    <div class="order-header-left-section">
                                        <div class="order-date">
                                            <div class="order-header-label">
                                                Order Placed:
                                            </div>
                                            <div>
                                                {dayjs(
                                                    order.orderTimeMS
                                                ).format("MMMM D")}
                                            </div>
                                        </div>
                                        <div class="order-total">
                                            <div class="order-header-label">
                                                Total:
                                            </div>
                                            <div>
                                                $
                                                {formatMoney(
                                                    order.totalCostCents
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="order-header-right-section">
                                        <div class="order-header-label">
                                            Order ID:
                                        </div>
                                        <div>{order.id}</div>
                                    </div>
                                </div>

                                <div class="order-details-grid">

                                    {order.products.map(product => { 
                                        return (
                                            <Fragment key={ product.id}>
                                                <div class="product-image-container">
                                                    <img src={ product.product.image} />
                                                </div>

                                                <div class="product-details">
                                                    <div class="product-name">
                                                        {product.product.name}
                                                    </div>
                                                    <div class="product-delivery-date">
                                                        Arriving on:{" "}
                                                        {dayjs(
                                                            product.estimatedDeliveryTimeMs
                                                        ).format("MMMM D")}
                                                       
                                                    </div>
                                                    <div class="product-quantity">
                                                        Quantity: { product.quantity}
                                                    </div>
                                                    <button class="buy-again-button button-primary">
                                                        <img
                                                            class="buy-again-icon"
                                                            src={BuyAgain}
                                                        />
                                                        <span class="buy-again-message">
                                                            Add to Cart
                                                        </span>
                                                    </button>
                                                </div>

                                                <div class="product-actions">
                                                    <a href="/tracking">
                                                        <button class="track-package-button button-secondary">
                                                            Track package
                                                        </button>
                                                    </a>
                                                </div>
                                            </Fragment>
                                        );
                                    })}

                       
                                </div>
                            </div>
                        );
                    })}
               
                </div>
            </div>
        </>
    );
}
