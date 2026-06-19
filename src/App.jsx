import Login from "./page/Login"
import Home from "./page/Home"
import Dashboard from "./page/Dashboard"
import { Routes,Route } from "react-router-dom"

function App() {


  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Dashboard"element={<Dashboard/>}/>
    </Routes>

      
    </>
  )
}

export default App
