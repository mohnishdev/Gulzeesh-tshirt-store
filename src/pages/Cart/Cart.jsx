import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Trash2, ArrowRight } from "lucide-react";
import { removeItem, updateQuantity } from "../../store/cartSlice";
import "./cart.scss";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;

  const handleQuantity = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    dispatch(updateQuantity({ id: item.id, quantity: newQty }));
  };

  return (
    <main className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        <p className="cart-subtitle">
          Review your editorial selection before checkout.
        </p>

        {cartItems.length === 0 ? (
          <div className="empty-cart">Your cart is empty.</div>
        ) : (
          <div className="cart-layout">
            {/* ── Left: Cart Items ── */}
            <section className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  {/* Image */}
                  <img src={item.image} alt={item.name} />

                  {/* Info + qty */}
                  <div className="item-content">
                    <h2>{item.name}</h2>
                    <p>
                      Size: {item.size}&nbsp;&nbsp;|&nbsp;&nbsp;Color:{" "}
                      {item.colour}
                    </p>

                    <div className="quantity-control">
                      <button
                        onClick={() => handleQuantity(item, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item, 1)}
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    {item.quantity >= item.stock && (
                      <p className="stock-info">{item.stock} quantity left in stock</p>
                    )}
                  </div>

                  {/* Price + Remove */}
                  <div className="item-actions">
                    <p className="item-price">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </section>

            {/* ── Right: Order Summary ── */}
            <aside className="cart-summary">
              <h2>Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal</span>
                <strong>₹{subtotal.toFixed(2)}</strong>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <strong className="shipping-text">
                  Calculated at next step
                </strong>
              </div>

              <div className="summary-row">
                <span>Estimated Tax</span>
                <strong>₹{tax.toFixed(2)}</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>

              <button className="checkout-btn">
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <p className="secure-text">Secure Encrypted Payment</p>

              <div className="payment-section">
                <p className="payment-label">Accepted Payments</p>
                <div className="payment-tags">
                  <span>VISA</span>
                  <span>MC</span>
                  <span>AMEX</span>
                  <span>PAYPAL</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;