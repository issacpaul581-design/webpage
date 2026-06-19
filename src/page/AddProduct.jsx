import { useState, useEffect } from "react"
import Navbar from "../comp/Navbar"
import Footer from "../comp/Footer"
import LoadingScreen from "../comp/LoadingScreen"
import "./addproduct.css"

function AddProduct() {
  const [pageLoading, setPageLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
    imageFile: null,
  })
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const pageLoadTimer = setTimeout(() => {
      setPageLoading(false)
    }, 4000)

    return () => clearTimeout(pageLoadTimer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imageFile: file,
      }))
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.price || !formData.category) {
      setMessage("❌ Please fill in all required fields")
      return
    }

    if (!formData.image && !formData.imageFile) {
      setMessage("❌ Please provide an image URL or upload an image file")
      return
    }

    setIsSubmitting(true)
    setMessage("")

    try {
      let imageData = formData.image

      // Convert file to base64 if file is selected
      if (formData.imageFile) {
        imageData = await convertFileToBase64(formData.imageFile)
      }

      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://sample-e-1.onrender.com/product/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            title: formData.title,
            price: parseFloat(formData.price),
            category: formData.category,
            description: formData.description,
            image: imageData,
          }),
        }
      )

      const data = await response.json()

      if (response.ok) {
        setMessage("✅ Product added successfully!")
        setFormData({
          title: "",
          price: "",
          category: "",
          description: "",
          image: "",
          imageFile: null,
        })
        setTimeout(() => {
          window.location.href = "/Home"
        }, 2000)
      } else {
        setMessage(data.message || "❌ Failed to add product")
      }
    } catch (error) {
      console.error(error)
      setMessage("❌ Server error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (pageLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="add-product-container">
      <Navbar />
      <main className="add-product-main">
        <div className="add-product-wrapper">
          <div className="form-header">
            <h1>Add New Product</h1>
            <p>Fill in the details below to add a new product to your store</p>
          </div>

          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="title">Product Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter product title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (₹) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                placeholder="Enter image URL"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-divider">OR</div>

            <div className="form-group">
              <label htmlFor="imageFile">Upload Image File</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="file-label">
                  {formData.imageFile ? formData.imageFile.name : "Choose a file..."}
                </span>
              </div>
            </div>

            {message && (
              <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AddProduct
