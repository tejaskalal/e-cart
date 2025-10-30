import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="container-fluid bg-dark">
      <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills fs-5">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              Cart
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
              Checkout
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Navbar;
