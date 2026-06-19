import "./card.css"
import { useState } from "react"

const API_BASE_URL = "https://sample-e-1.onrender.com"

function Card({ image, title, price, description, category, id }) {
  const [isAdded, setIsAdded] = useState(false)

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `${API_BASE_URL}/${image}`
    : "https://via.placeholder.com/300"

  const handleAddToCart = () => {
    // Get existing cart
    const existingCart = localStorage.getItem("cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    // Create product object with all details
    const product = {
      id: id || title,
      title,
      price: parseFloat(price) || 0,
      image: imageUrl,
      description,
      category,
      quantity: 1,
    }

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.id === product.id)
    
    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.push(product)
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart))

    // Show feedback
    setIsAdded(true)
    alert(`✅ "${title}" added to cart!`)

    // Reset button after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <article className="product-card">
      <img
        src={imageUrl}
        alt={title || "Product"}
        className="product-image"
      />

      <p className="product-tag">{category || "General"}</p>
      <h2 className="product-name">{title || "Unnamed Product"}</h2>
      <p className="product-price">₹{price || 0}</p>
      {description ? (
        <p className="product-description">{description}</p>
      ) : null}
      <button 
        type="button" 
        onClick={handleAddToCart}
        className={isAdded ? "added" : ""}
      >
        {isAdded ? "✓ Added!" : "Add to Cart"}
      </button>
    </article>
  )
}

export default Card

