import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateEmail } from "firebase/auth";
import { AuthContext } from './Context';

export default function Settings() {
  const [error, setError] = useState("")
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const promises = []
    const email = e.target[0].value
    try {
      if (email.current.value !== currentUser.email) {
        promises.push(updateEmail(email.current.value))
      }
      navigate("/")
    } catch {
      setError("Failed to change an email")
    }

    Promise.all(promises).then(() => {
      navigate("/")
    }).catch(() => {
      setError("Failed update to account")
    })
  }
  return (
    <motion.div
      className="card"
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0 } }}
    >
      <div className="card-body">
        <h2>Settings</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='New Email' required style={{ marginBottom: "14px" }} />
          {/* <input type="password" placeholder='Password' required style={{ marginBottom: "14px" }} /> */}
          {/* <input type="password" placeholder='Confirm Password' required style={{ marginBottom: "14px" }} /> */}
          <button className='btn'>Update</button>
        </form>
        <p className='signup'><Link to="/">Cancel</Link></p>
      </div>
    </motion.div>
  )
}
