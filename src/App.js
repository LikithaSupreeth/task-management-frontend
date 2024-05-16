import { Link, Route, Routes } from "react-router-dom"

import Account from "./components/Account"
import Dashboard from "./components/Dashboard"
import Home from "./components/Home"
import Login from "./components/Login"
import React from "react"
import Register from "./components/Register"
import TaskForm from "./components/Tasks/TaskForm"
import PrivateRoute from "./components/PrivateRoute"
import axios from "axios"
import { useAuth } from "./context/AuthContext"
import { useEffect } from "react"

export default function App() {

  const { user, handleLogin, handleLogout } = useAuth()

  useEffect(() => {
    if (localStorage.getItem('token')) {

      (async () => {
        const response = await axios.get('http://localhost:3456/users/account', {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        handleLogin(response.data)
      })()

    }
  }, [])

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
          <Link to = "/dashboard">Dashboard</Link> |          
          <Link to="/" onClick={() => {
            localStorage.removeItem('token')
            handleLogout()
          }}>Logout</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
        <Route path="/account" element={<PrivateRoute> <Account /> </PrivateRoute>}></Route>
      </Routes>
    </div>
  )
}
