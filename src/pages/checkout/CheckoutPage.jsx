import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate} from 'react-router'
import dayjs, { Dayjs } from "dayjs";
import "./CheckoutPage.css";
import { CheckoutHeader } from "./CheckoutHeader";
import { formatMoney } from "../../utils/money";

function CheckoutPage({ cart = [], loadCarts }) {

    const navigate = useNavigate()
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    // track which cart item is being edited and its temporary quantity
    const [editingProductId, setEditingProductId] = useState(null);
    const [editingQuantity, setEditingQuantity] = useState(1);

    useEffect(() => {
        axios
            .get("/api/delivery-options?expand=estimatedDeliveryTime")
            .then((response) => {
                setDeliveryOptions(response.data);
            });
        axios.get("/api/payment-summary").then((response) => {
            setPaymentSummary(response.data);
            console.log(response.data);
        });
    }, [cart]);

    return (
        <>
            <title>Checkout</title>
            <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />
            <CheckoutHeader cart={cart} />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 &&
                            cart.map((cartItem) => {
                                const selectedDeliveryOption =
                                    deliveryOptions.find(
                                        (deliveryOption) =>
                                            deliveryOption.id ===
                                            cartItem.deliveryOptionId
                                    );
                                const isEditing =
                                    editingProductId === cartItem.productId;
                                const startEdit = () => {
                                    setEditingProductId(cartItem.productId);
                                    setEditingQuantity(
                                        Number(cartItem.quantity) || 1
                                    );
                                };
                                const cancelEdit = () => {
                                    setEditingProductId(null);
                                    setEditingQuantity(1);
                                };
                                const saveEdit = async () => {
                                    const qty = Number(editingQuantity) || 1;
                                    try {
                                        await axios.put(
                                            `/api/cart-items/${cartItem.productId}`,
                                            { quantity: qty }
                                        );
                                        await loadCarts();
                                    } catch (err) {
                                        console.error(
                                            "Failed to update quantity",
                                            err
                                        );
                                        const serverMsg =
                                            err?.response?.data || err?.message;
                                        alert(
                                            "Failed to update quantity: " +
                                                (serverMsg?.message ||
                                                    JSON.stringify(serverMsg))
                                        );
                                    } finally {
                                        cancelEdit();
                                    }
                                };
                                const deleteCartItem = async () => {
                                    await axios.delete(
                                        `/api/cart-items/${cartItem.productId}`
                                    );
                                    await loadCarts();
                                };
                                return (
                                    <div
                                        key={cartItem.productId}
                                        className="cart-item-container">
                                        <div className="delivery-date">
                                            Delivery date:{" "}
                                            {dayjs(
                                                selectedDeliveryOption.estimatedDeliveryTimeMs
                                            ).format("dddd, MMMM D")}
                                        </div>

                                        <div className="cart-item-details-grid">
                                            <img
                                                className="product-image"
                                                src={cartItem.product.image}
                                            />

                                            <div className="cart-item-details">
                                                <div className="product-name">
                                                    {cartItem.product.name}
                                                </div>
                                                <div className="product-price">
                                                    {formatMoney(
                                                        cartItem.product
                                                            .priceCents
                                                    )}
                                                </div>
                                                <div className="product-quantity">
                                                    <span>
                                                        Quantity:{" "}
                                                        <span className="quantity-label">
                                                            {!isEditing ? (
                                                                cartItem.quantity
                                                            ) : (
                                                                <select
                                                                    value={
                                                                        editingQuantity
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setEditingQuantity(
                                                                            Number(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        )
                                                                    }>
                                                                    {Array.from(
                                                                        {
                                                                            length: 10,
                                                                        },
                                                                        (
                                                                            _,
                                                                            i
                                                                        ) =>
                                                                            i +
                                                                            1
                                                                    ).map(
                                                                        (n) => (
                                                                            <option
                                                                                key={
                                                                                    n
                                                                                }
                                                                                value={
                                                                                    n
                                                                                }>
                                                                                {
                                                                                    n
                                                                                }
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                            )}
                                                        </span>
                                                    </span>
                                                    {!isEditing ? (
                                                        <>
                                                            <span
                                                                onClick={
                                                                    startEdit
                                                                }
                                                                className="update-quantity-link link-primary">
                                                                Update
                                                            </span>
                                                            <span
                                                                onClick={
                                                                    deleteCartItem
                                                                }
                                                                className="delete-quantity-link link-primary">
                                                                Delete
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span
                                                                onClick={
                                                                    saveEdit
                                                                }
                                                                className="update-quantity-link link-primary">
                                                                Save
                                                            </span>
                                                            <span
                                                                onClick={
                                                                    cancelEdit
                                                                }
                                                                className="delete-quantity-link link-primary">
                                                                Cancel
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="delivery-options">
                                                <div className="delivery-options-title">
                                                    Choose a delivery option:
                                                </div>

                                                {deliveryOptions.map(
                                                    (deliveryOption) => {
                                                        let priceString =
                                                            "FREE Shipping";
                                                        if (
                                                            deliveryOption.priceCents >
                                                            0
                                                        ) {
                                                            priceString = `${formatMoney(
                                                                deliveryOption.priceCents
                                                            )} - Shipping`;
                                                        }

                                                        const updateDeliveryOption =
                                                            async () => {
                                                                await axios.put(
                                                                    `/api/cart-items/${cartItem.productId}`,
                                                                    {
                                                                        deliveryOptionId:
                                                                            deliveryOption.id,
                                                                    }
                                                                );
                                                                await loadCarts();
                                                            };
                                                        return (
                                                            <div
                                                                key={`${cartItem.productId}-${deliveryOption.id}`}
                                                                className="delivery-option"
                                                                onClick={
                                                                    updateDeliveryOption
                                                                }>
                                                                <input
                                                                    onChange={() => {}}
                                                                    type="radio"
                                                                    checked={
                                                                        deliveryOption.id ===
                                                                        cartItem.deliveryOptionId
                                                                    }
                                                                    className="delivery-option-input"
                                                                    name={`delivery-option-${cartItem.productId}`}
                                                                />
                                                                <div>
                                                                    <div className="delivery-option-date">
                                                                        {dayjs(
                                                                            deliveryOption.estimatedDeliveryTimeMs
                                                                        ).format(
                                                                            "dddd, MMMM, D"
                                                                        )}
                                                                    </div>
                                                                    <div className="delivery-option-price">
                                                                        {
                                                                            priceString
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items {paymentSummary?.totalItems ?? 0}:</div>
                            <div className="payment-summary-money">
                                {formatMoney(
                                    paymentSummary?.productCostCents ?? 0
                                )}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Shipping &amp; handling:</div>
                            <div className="payment-summary-money">
                                {formatMoney(
                                    paymentSummary?.shippingCostCents ?? 0
                                )}
                            </div>
                        </div>

                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">
                                {formatMoney(
                                    paymentSummary?.totalCostBeforeTaxCents ?? 0
                                )}
                            </div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">
                                {formatMoney(paymentSummary?.taxCents ?? 0)}
                            </div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">
                                {formatMoney(
                                    paymentSummary?.totalCostCents ?? 0
                                )}
                            </div>
                        </div>

                        <button
                            onClick={async () => {
                                await axios.post("/api/orders");
                                await loadCarts()
                                navigate('/orders')
                            }
                            
                            }
                            className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;
