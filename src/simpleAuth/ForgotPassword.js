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
                    {error && <p className='error'>{error}</p>}
                    {message && <p className='message'>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="email" id='email' placeholder='Email' style={{ marginBottom: "14px" }} required ref={emailRef} />
                        </div>
                        <Link className='forgot-password' style={{marginTop: "0"}} to="/login">Login</Link>
                        <button className='btn' style={{ width: "70%" }} disabled={loading} type='submit'>Reset Password</button>
                    </form>
                    <div>
                        <p className='signup'>Need an account? <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
