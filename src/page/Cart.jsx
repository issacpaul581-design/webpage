import { useState, useEffect } from "react"
import Navbar from "../comp/Navbar"
import Footer from "../comp/Footer"
import LoadingScreen from "../comp/LoadingScreen"
import "../page/cart.css"

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 4 seconds when entering page
    const pageLoadTimer = setTimeout(() => {
      setPageLoading(false)
    }, 4000)

    return () => clearTimeout(pageLoadTimer)
  }, [])

  useEffect(() => {
    if (!pageLoading) {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        setCartItems(JSON.parse(savedCart))
      }
    }
  }, [pageLoading])

  if (pageLoading) {
    return <LoadingScreen />
  }

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    const updatedCart = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="cart-container">
      <Navbar />
      <main className="cart-main">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Start adding products to your cart!</p>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <h2>Shopping Cart ({getTotalItems()} items)</h2>
              <div className="items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="item-image" />
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p className="item-category">{item.category}</p>
                      <p className="item-description">{item.description}</p>
                    </div>
                    <div className="item-price">
                      <p className="price">₹{item.price}</p>
                    </div>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        min="1"
                      />
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      <p>₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal ({getTotalItems()} items):</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span className="free">Free</span>
              </div>
              <div className="summary-row">
                <span>Tax:</span>
                <span>₹0</span>
              </div>
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <button className="continue-shopping-btn">Continue Shopping</button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default Cart
