import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import Account from "./components/Account"
import { useAuth} from "./context/AuthContext"
import { Link, Route, Routes } from "react-router-dom"

export default function App() {

  const { user , handleLogout} = useAuth()

  return (
    <div>
      <h1>Task Management App</h1>
      <Link to="/">Home</Link> |
      {!user ? (
        <>
          <Link to="/register">Register</Link> |
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/account">Account</Link> |
          <Link to="/" onClick={()=>{
            localStorage.removeItem('token')
            handleLogout()
          }}>Logout</Link>
        </>
      )}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account/>}></Route>
      </Routes>
    </div>
  )
}
