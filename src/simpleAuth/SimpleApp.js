import React from 'react'
import SignUp from './SignUp'
import { Routes, Route, useNavigate } from "react-router-dom"
import Dashboard from './Dashboard'
import Login from "./Login"
import Settings from './Settings'
import { useAuth } from './context/AuthContext'
import ForgotPassword from './ForgotPassword'

export default function SimpleApp() {
  const currentUser = useAuth()
  const navigate = useNavigate()

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return navigate("/")
    } else {
      return children
    }
  }
  return (
    <Routes>
      <Route path="/">
        <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}
