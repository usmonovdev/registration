import React from 'react'
import { useContext } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from './Context'
import Home from './Home'
import LogIn from './LogIn'
import SignUp from './SignUp'
import { AnimatePresence } from 'framer-motion'
import "./style.css"

export default function PersonalAuth() {
  const location = useLocation()
  const { currentUser } = useContext(AuthContext)
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path='/'>
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
