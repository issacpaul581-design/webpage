import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./addproduct.css"

function AddProduct() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState(1)
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (event) => {
  
    event.preventDefault()

    if (!title || !price || !category || !imageFile) {
      setError("Please fill in title, price, category, and select an image file.")
      return
    }

    setSaving(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("name", title)
      formData.append("price", Number(price))
      formData.append("category", category)
      formData.append("description", description)
      formData.append("stock", Number(stock))
      formData.append("image", imageFile)

      const response = await fetch("https://sample-e-1.onrender.com/product/addproduct", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.message || "Could not save product to API.")
      }

      navigate("/dashboard")
    } catch (err) {
      console.error(err)
      setError(err.message || "Could not save product to API.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit} className="add-product-form">
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product name"
            />
          </label>

          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              min="0"
              step="0.01"
            />
          </label>

          <label>
            Category
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
            />
          </label>

          <label>
            Product Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock quantity"
              min="0"
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Product description"
              rows="4"
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="submit-button" disabled={saving}>
            {saving ? "Saving..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  )
}
export default AddProduct
