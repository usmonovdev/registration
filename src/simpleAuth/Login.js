import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
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
          <h2>Log In</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' placeholder='Email' required ref={emailRef} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' placeholder='Password' required ref={passwordRef} />
            </div>
            <Link to="/forgot-password">Forgot Password?</Link>
            <button disabled={loading} type='submit'>Log In</button>
          </form>
        </div>
      </div>
      <div>
        <p>Need an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </>
  )
}
