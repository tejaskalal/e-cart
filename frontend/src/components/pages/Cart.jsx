import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleRemove = (_id) => {
    const updatedCart = cart.filter((item) => item._id !== _id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (_id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cart.map((item) =>
      item._id === _id ? { ...item, qty: newQty } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛍 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="d-flex justify-content-between align-items-center border-bottom py-3"
            >
              <div>
                <h5>{item.name}</h5>
                <p className="mb-0">₹{item.price}</p>
              </div>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => handleQuantityChange(item._id, item.qty - 1)}
                >
                  −
                </button>
                <span>{item.qty}</span>
                <button
                  className="btn btn-outline-secondary mx-2"
                  onClick={() => handleQuantityChange(item._id, item.qty + 1)}
                >
                  +
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-end mt-4">
            <h4>Total: ₹{total.toFixed(2)}</h4>
            <button
              className="btn btn-success mt-3"
              onClick={() => (window.location.href = "/api/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
