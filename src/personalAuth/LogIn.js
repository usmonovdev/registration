import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './personalFirebase';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

export default function LogIn() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value
        try {
            const login = await signInWithEmailAndPassword(auth, email, password)
            navigate("/")
            console.log(login);
        } catch {
            setError("Error to Login")
        }
    }
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
            exit={{ opacity: 0, x: -100, transition: { duration: 0 } }}
        >
            <div className="card-body">
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email' required style={{ marginBottom: "14px" }} />
                    <input type="password" placeholder='Password' required style={{ marginBottom: "14px" }} />
                    <button className='btn'>Log In</button>
                </form>
                <p className='signup'>You Need an account? <Link to="/signup">Register</Link></p>
            </div>
        </motion.div>
    )
}