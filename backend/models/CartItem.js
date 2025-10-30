import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  qty: { type: Number, default: 1 },
  priceAtAdd: { type: Number, required: true },
  nameSnapshot: { type: String, required: true },
  userId: { type: String, default: "default_user" },
  addedAt: { type: Date, default: Date.now },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
