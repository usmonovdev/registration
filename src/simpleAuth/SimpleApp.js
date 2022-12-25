import React from 'react'
import SignUp from './SignUp'
import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from './Dashboard'
import Login from "./Login"
import Settings from './Settings'
import { AuthProvider, useAuth } from './context/AuthContext'
import ForgotPassword from './ForgotPassword'
import { PageTransition } from '@steveeeie/react-page-transition'

export default function SimpleApp() {
  const currentUser = useAuth()

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
  }
  return (
    <AuthProvider>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
