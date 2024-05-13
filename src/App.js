import { Link, Route, Routes } from "react-router-dom"

import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import { useAuth } from "./context/AuthContext"

export default function App() {

  const { user } = useAuth()

  return (
    <div>
      <h1>Task Management App</h1>
      <Link to="/">Home</Link> |
      {!user ? (
        <div>
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div>
          <Link to="/account">Account</Link> |
          <Link to="/">Logout</Link>
        </div>
      )}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}
