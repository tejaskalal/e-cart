const API_BASE =
  import.meta.env.VITE_API_URL || "https://e-cart-backend-29qd.onrender.com";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/api/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function checkout(data) {
  const res = await fetch(`${API_BASE}/api/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
}
