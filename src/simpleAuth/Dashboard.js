import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()
  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to logout")
    }
  }
  return (
    <>
      <div className='card'>
        <div className="card-body">
          <h2>Profile</h2>
          {error && <p>{error}</p>}
          <p><strong>Email: </strong>{currentUser.email}</p>
          <Link to="/settings">Update Profile</Link>
        </div>
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </>
  )
}