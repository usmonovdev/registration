import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)

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
                            <input type="password" id='password' placeholder='Password' required ref={passwordRef} />
                        </div>
                        <div>
                            <label htmlFor="password-confirm">Password Confirm</label>
                            <input type="password" id='password-confirm' placeholder='Password' required ref={passwordConfirmRef} />
                        </div>
                        <button disabled={loading} type='submit'>Sign Up</button>
                    </form>
                </div>
            </div>
            <div>
                <p>Already have an account? <Link to="/login">Log In</Link></p>
            </div>
        </>
    )
}
