import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

function Login() {
const navigate = useNavigate()
const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [message, setMessage] = useState("")


const handleLogin = async () => {
    if (!username || !password) {
        setMessage("❌ Please enter username and password")
        return
    }

    try {
        const response = await fetch(
            "https://sample-e-1.onrender.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            }
        )

        const data = await response.json()

        if (response.ok) {
            setMessage("✅ Login Successful!")

            if (data.token) {
                localStorage.setItem("token", data.token)
            }

            navigate("/Dashboard")
        } else {
            setMessage(data.message || "❌ Login Failed")
        }
    } catch (error) {
        console.error(error)
        setMessage("❌ Server error. Please try again.")
    }
}

return (
    <div className="container">
        <div className="login-box">
            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin}>
                Login
            </button>

            <p>{message}</p>

            <p>
                Don't have an account?{" "}
                <Link to="/Home">Sign Up</Link>
            </p>
        </div>
    </div>
)


}

export default Login