import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce_dev";

const products = [
  {
    name: "Basic T-Shirt",
    description: "Cotton tee",
    price: 499,
    image: "/images/tshirt.png",
  },
  {
    name: "Running Shoes",
    description: "Comfortable shoes",
    price: 2499,
    image: "/images/shoes.png",
  },
  {
    name: "Smart Watch",
    description: "Fitness + notifications",
    price: 4599,
    image: "/images/watch.png",
  },
  {
    name: "Noise Headphones",
    description: "Over-ear, noise cancelling",
    price: 6999,
    image: "/images/headphones.png",
  },
  {
    name: "Denim Jacket",
    description: "Classic blue denim jacket",
    price: 1999,
    image: "/images/jacket.png",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass",
    price: 2999,
    image: "/images/speaker.png",
  },
  {
    name: "Gaming Mouse",
    description: "RGB wired optical gaming mouse",
    price: 1599,
    image: "/images/mouse.png",
  },
  {
    name: "Wireless Keyboard",
    description: "Compact Bluetooth keyboard",
    price: 1899,
    image: "/images/keyboard.png",
  },
  {
    name: "Laptop Backpack",
    description: "Water-resistant, 15-inch laptop bag",
    price: 1299,
    image: "/images/backpack.png",
  },
  {
    name: "Sunglasses",
    description: "UV protection aviator style",
    price: 799,
    image: "/images/sunglasses.png",
  },
  {
    name: "Casual Sneakers",
    description: "Stylish everyday wear shoes",
    price: 2199,
    image: "/images/sneakers.png",
  },
  {
    name: "Wireless Earbuds",
    description: "Noise-isolating true wireless earbuds",
    price: 3499,
    image: "/images/earbuds.png",
  },
  {
    name: "Fitness Band",
    description: "Track steps, heart rate, and sleep",
    price: 1799,
    image: "/images/fitnessband.png",
  },
  {
    name: "Hoodie",
    description: "Comfortable fleece pullover hoodie",
    price: 1599,
    image: "/images/hoodie.png",
  },
  {
    name: "Power Bank",
    description: "10000mAh fast charging portable charger",
    price: 1399,
    image: "/images/powerbank.png",
  },
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongo for seeding");

    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Seeded products");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
