import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">ShopEasy</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>Products</li>
        <li>Categories</li>
        <li>Contact</li>
      </ul>

      <div className="cart">
        🛒 Cart
      </div>
    </nav>
  );
}

export default Navbar;