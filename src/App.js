import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import Home from "./components/Home"
import Register from "./components/Register"
import Login from "./components/Login"

export default function App(){
  return (
    <div>
      <h1>Task Management App</h1>
      <Link to="/">Home</Link> | <Link to="/register">Register</Link> | <Link to="/login">Login</Link>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}
