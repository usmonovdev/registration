import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage("")
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
        setLoading(false)

    }

    return (
        <>
            <div className='card'>
                <div className="card-body">
                    <h2>Password Reset</h2>
                    {error && <p>{error}</p>}
                    {message && <p>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" id='email' placeholder='Email' required ref={emailRef} />
                        </div>
                        <Link to="/login">Login</Link>
                        <button disabled={loading} type='submit'>Reset Password</button>
                    </form>
                </div>
            </div>
            <div>
                <p>Need an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </>
    )
}
