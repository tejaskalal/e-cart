const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, qty }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function checkout(data) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Checkout failed");
  return res.json();
}
