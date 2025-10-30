import express from "express";
import CartItem from "../models/CartItem.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId || "default_user";
    const items = await CartItem.find({ userId }).populate("product");
    const total = items.reduce((sum, it) => sum + it.priceAtAdd * it.qty, 0);
    res.json({ cart: items, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { productId, qty = 1, userId = "default_user" } = req.body;
    if (!productId)
      return res.status(400).json({ message: "productId required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let item = await CartItem.findOne({ product: productId, userId });
    if (item) {
      item.qty += qty;
      await item.save();
    } else {
      item = await CartItem.create({
        product: productId,
        qty,
        priceAtAdd: product.price,
        nameSnapshot: product.name,
        userId,
      });
    }

    const cart = await CartItem.find({ userId }).populate("product");
    const total = cart.reduce((sum, it) => sum + it.priceAtAdd * it.qty, 0);
    res.json({ cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { qty } = req.body;
    const item = await CartItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    item.qty = qty;
    await item.save();
    const cart = await CartItem.find({ userId: item.userId }).populate(
      "product"
    );
    const total = cart.reduce((sum, it) => sum + it.priceAtAdd * it.qty, 0);
    res.json({ cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    const userId = req.query.userId || "default_user";
    const cart = await CartItem.find({ userId }).populate("product");
    const total = cart.reduce((sum, it) => sum + it.priceAtAdd * it.qty, 0);
    res.json({ cart, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
