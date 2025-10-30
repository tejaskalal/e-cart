import { useEffect, useState } from "react";
import { getProducts } from "../../api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = oldCart.find((item) => item._id === product._id);

    let updatedCart;
    if (existing) {
      updatedCart = oldCart.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...oldCart, { ...product, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} successfully added to cart!`);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Our Products</h2>

      {loading ? (
        <p className="text-center">Loading products...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted">No products found.</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 mb-3" key={p._id}>
              <div className="card shadow-sm">
                <img
                  src={p.image || "https://via.placeholder.com/200x150"}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">₹{p.price}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
