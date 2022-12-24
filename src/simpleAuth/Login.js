import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { auth } from './firebase'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value

    try {
      setError("")
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch {
      setError("Failed to log in")
    }
    setLoading(false)
  }

  return (
    <>
      <div className='card'>
        <div className="card-body">
          <h2>User Login</h2>
          {error && <p className='error'>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <input type="email" id='email' placeholder='Email' style={{marginBottom: "14px"}} required ref={emailRef} />
            </div>
            <div>
              <input type="password" id='password' placeholder='Password' required ref={passwordRef} />
            </div>
            <Link className='forgot-password' to="/forgot-password">Forgot Password?</Link>
            <button className='btn' disabled={loading} type='submit'>Log In</button>
          </form>
          <div>
            <p className='signup'>Need an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
