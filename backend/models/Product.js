import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true },
  image: { type: String, default: "" },
  stock: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
