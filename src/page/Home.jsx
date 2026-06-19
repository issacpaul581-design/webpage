 import "./login.css"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()

  const handleSignup = () => {
    navigate("/dashboard")
  }

  return (
    <div className="container">
      <div className="login-box">
        <h1>Sign Up</h1>

        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button onClick={handleSignup}>
          Create Account
        </button>
      </div>
    </div>
  )
}

export default Signup