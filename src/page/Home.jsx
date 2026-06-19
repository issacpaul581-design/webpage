 import "./home.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import LoadingScreen from "../comp/LoadingScreen"
import Navbar from "../comp/Navbar"
import Footer from "../comp/Footer"
import Card from "../comp/Card"

function Home() {
  const navigate = useNavigate()
  const [pageLoading, setPageLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Show loading screen for 4 seconds when entering page
    const pageLoadTimer = setTimeout(() => {
      setPageLoading(false)
    }, 4000)

    return () => clearTimeout(pageLoadTimer)
  }, [])

  useEffect(() => {
    if (!pageLoading) {
      fetchProducts()
    }
  }, [pageLoading])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://sample-e-1.onrender.com/product/getproducts", {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (!response.ok) {
        throw new Error("Failed to load products")
      }

      const data = await response.json()
      const normalizedData = Array.isArray(data)
        ? data
        : Array.isArray(data?.value)
        ? data.value
        : []

      setProducts(normalizedData)
    } catch (err) {
      console.error(err)
      setError("Could not load products. Add them in Postman or check the API.")
    } finally {
      setLoading(false)
    }
  }

  if (pageLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="home-container">
      <Navbar />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to ShopEasy</h1>
          <p className="hero-subtitle">
            Your one-stop shop for amazing products. Browse and manage your inventory.
          </p>
        </div>
      </div>

      <div className="products-section">
        <div className="section-header">
          <h2>Our Products</h2>
          <button 
            className="add-product-btn"
            onClick={() => navigate("/AddProduct")}
          >
            ➕ Add New Product
          </button>
        </div>

        {loading ? (
          <p className="loading-text">Loading products...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : products.length === 0 ? (
          <div className="empty-products">
            <p>No products available yet.</p>
            <button 
              className="add-first-product-btn"
              onClick={() => navigate("/AddProduct")}
            >
              ➕ Add Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <Card
                key={product.id || product._id || product.title}
                id={product.id || product._id}
                image={product.image || product.img || "https://via.placeholder.com/250x220"}
                title={product.title || product.name || "Unnamed Product"}
                price={product.price || "0"}
                description={product.description}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Home