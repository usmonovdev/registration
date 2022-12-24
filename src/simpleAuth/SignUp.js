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

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
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
                    {error && <p className='error'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input type="email" id='email' placeholder='Email' style={{marginBottom: "14px"}} required ref={emailRef} />
                        </div>
                        <div>
                            <input type="password" id='password' placeholder='Password' style={{marginBottom: "14px"}} required ref={passwordRef} />
                        </div>
                        <div>
                            <input type="password" id='password-confirm' placeholder='Password' style={{marginBottom: "14px"}} required ref={passwordConfirmRef} />
                        </div>
                        <button className='btn' disabled={loading} type='submit'>Sign Up</button>
                    </form>
                    <div>
                        <p className='signup'>Already have an account? <Link to="/login">Log In</Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}
