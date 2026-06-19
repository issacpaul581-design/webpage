import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Update cart count
    const updateCartCount = () => {
      const cart = localStorage.getItem("cart");
      if (cart) {
        const items = JSON.parse(cart);
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    // Listen for storage changes
    window.addEventListener("storage", updateCartCount);
    // Custom event for cart updates from same tab
    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const handleNavClick = (page) => {
    switch(page) {
      case "Home":
        navigate("/Home");
        break;
      case "Products":
        navigate("/Dashboard");
        break;
      case "Categories":
        alert("📂 Categories page coming soon!");
        break;
      case "Contact":
        alert("📧 Contact us at: support@shopeasey.com");
        break;
      default:
        break;
    }
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  return (
    <nav className="navbar">
      <div className="logo">ShopEasy</div>

      <ul className="nav-links">
        <li onClick={() => handleNavClick("Home")}>Home</li>
        <li onClick={() => handleNavClick("Products")}>Products</li>
        <li onClick={() => handleNavClick("Categories")}>Categories</li>
        <li onClick={() => handleNavClick("Contact")}>Contact</li>
      </ul>

      <div className="cart" onClick={handleCartClick}>
        🛒 Cart
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
    </nav>
  );
}

export default Navbar;