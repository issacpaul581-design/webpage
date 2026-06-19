import Login from "./page/Login"
import Home from "./page/Home"
import Dashboard from "./page/Dashboard"
import Cart from "./page/Cart"
import AddProduct from "./page/AddProduct"
import LoadingScreen from "./comp/LoadingScreen"
import { Routes,Route } from "react-router-dom"
import { useState, useEffect } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 4 seconds on app startup
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Dashboard"element={<Dashboard/>}/>
      <Route path="/Cart"element={<Cart/>}/>
      <Route path="/AddProduct"element={<AddProduct/>}/>
    </Routes>

      
    </>
  )
}

export default App
