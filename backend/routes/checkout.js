import express from "express";
import CartItem from "../models/CartItem.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Incoming checkout body:", req.body);
    const { name, email, cartItems } = req.body;

    if (!cartItems || cartItems.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    await CartItem.deleteMany({ userId: "default_user" });

    const transactionId = "TXN" + Date.now();

    const receipt = {
      id: Math.floor(Math.random() * 1000000),
      name,
      email,
      total,
      timestamp: new Date().toISOString(),
      payment: {
        method: "UPI",
        status: "Paid",
        transactionId,
      },
      items: cartItems.map((i) => ({
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
    };

    console.log("Checkout success:", receipt);

    res.status(200).json({
      success: true,
      message: "Checkout successful",
      receipt,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

export default router;
