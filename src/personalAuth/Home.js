import { signOut } from 'firebase/auth'
import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './Context'
import { auth } from './personalFirebase'
import { motion } from 'framer-motion'

export default function Home() {
  const { currentUser } = useContext(AuthContext)
  return (
    <motion.div
      className='card'
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 1, x: -100, transition: { duration: 0 } }}
    >
      <div className="card-body">
        <h2>User Profile</h2>
        <p className='signup' style={{ marginTop: "0" }}><strong>User Name: </strong>{currentUser.displayName}</p>
        <p className='signup' style={{ marginTop: "0" }}><strong>Email: </strong>{currentUser.email}</p>
        <button className='out' onClick={() => signOut(auth)}>Log Out</button>
        <Link to="/settings">Settings</Link>
      </div>
    </motion.div>
  )
}