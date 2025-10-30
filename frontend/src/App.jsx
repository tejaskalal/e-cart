import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./components/pages/Product";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
