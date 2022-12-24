import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function Settings() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateSetEmail, updateSetPassword } = useAuth()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")
    if(passwordRef.current.value) {
      promises.push(updateSetPassword(passwordRef.current.value))
    }

    if(emailRef.current.value !== currentUser.email) {
      promises.push(updateSetEmail(emailRef.current.value))
    }

    Promise.all(promises).then(() => {
      navigate("/")
    }) .catch (() => {
      setError("Failed update to account")
    }) .finally(() => {
      setLoading(false)
    })

  }

  return (
    <>
      <div className='card'>
        <div className="card-body">
          <h2>Sign Up</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id='email' placeholder='Email' required ref={emailRef} />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id='password' placeholder='Password' ref={passwordRef} />
            </div>
            <div>
              <label htmlFor="password-confirm">Password Confirm</label>
              <input type="password" id='password-confirm' placeholder='Password' ref={passwordConfirmRef} />
            </div>
            <button disabled={loading} type='submit'>Update</button>
          </form>
        </div>
      </div>
      <div>
        <p><Link to="/">Cancel</Link></p>
      </div>
    </>
  )
}
