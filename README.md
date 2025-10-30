# 🛒 Mock E-Commerce Cart App

A simple full-stack shopping cart web app built for the **Vibe Commerce internship assignment**.  
This project demonstrates core e-commerce flows — product listing, cart management, and mock checkout — using **React**, **Node.js/Express**, and **MongoDB**.

---

## Features

### Frontend (React)
- Product grid with **Add to Cart** button  
- Cart view with **update/remove items**  
- Checkout form (name & email) → generates mock receipt  
- Responsive design for desktop and mobile  

### ⚙️ Backend (Node.js + Express)
- REST APIs for products, cart, and checkout  
- MongoDB for mock data persistence  
- Calculates total, clears cart on checkout, and returns receipt JSON  

---

## Tech Stack
**Frontend:** React, Bootstrap  
**Backend:** Node.js, Express  
**Database:** MongoDB  
**Tools:** Axios, Mongoose  

---

## 📂 Folder Structure
ecommerce-cart/
│
├── backend/ # Node.js + Express backend
│ ├── models/ # Mongoose models (Product, CartItem)
│ ├── routes/ # API routes
│ ├── server.js # Express server entry
│
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Navbar, Footer, Cart
│ │ ├── pages/ # Product, Checkout, Cart pages
│ │ └── App.js
│
└── README.md # Project documentation
