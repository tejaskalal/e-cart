import React, { useState, useEffect } from "react";
import { checkout } from "../../api";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const totalAmount = storedCart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    setTotal(totalAmount);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert("Please fill out your name and email.");
      return;
    }

    setLoading(true);

    try {
      const res = await checkout({
        name: formData.name,
        email: formData.email,
        cartItems: cart,
      });

      console.log("Checkout response:", res);

      const finalReceipt = res.receipt || res.data?.receipt;
      if (!finalReceipt)
        throw new Error("Receipt missing from server response");

      setReceipt(finalReceipt);

      localStorage.removeItem("cart");
      setCart([]);
      setTotal(0);
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Checkout</h2>

      {!receipt ? (
        <>
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty.</p>
          ) : (
            <>
              <h5>Order Summary</h5>
              <ul className="list-group mb-4">
                {cart.map((item) => (
                  <li
                    key={item._id || item.id}
                    className="list-group-item d-flex justify-content-between"
                  >
                    <span>
                      {item.name} (x{item.qty})
                    </span>
                    <span>₹{item.price * item.qty}</span>
                  </li>
                ))}
              </ul>

              <h4 className="text-end mb-4">Total: ₹{total}</h4>

              <form onSubmit={handleCheckout} className="p-3 border rounded">
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </>
          )}
        </>
      ) : (
        <div className="text-center mt-5 border p-4 rounded">
          <h3>Order Confirmed!</h3>
          <p>
            Thank you, <strong>{receipt.name}</strong>!
          </p>
          <p>
            Your receipt has been sent to <strong>{receipt.email}</strong>.
          </p>

          <div className="mt-3">
            <h5>Receipt Details</h5>
            <p>
              <strong>Total Paid:</strong> ₹{receipt.total}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(receipt.timestamp).toLocaleString()}
            </p>
            <p>
              <strong>Payment:</strong> {receipt.payment?.method} (
              {receipt.payment?.status})
            </p>
            <p>
              <strong>Transaction ID:</strong>{" "}
              {receipt.payment?.transactionId || "N/A"}
            </p>
          </div>

          <h6 className="mt-4">Items:</h6>
          <ul className="list-group">
            {receipt.items.map((i, idx) => (
              <li
                key={idx}
                className="list-group-item d-flex justify-content-between"
              >
                <span>
                  {i.name} (x{i.qty})
                </span>
                <span>₹{i.price * i.qty}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Checkout;
