import React from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { auth, db } from './personalFirebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function SignUp() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        try {
            const ref = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(ref.user, {
                displayName
            })
            await setDoc(doc(db, "users", ref.user.uid), {
                uid: ref.user.uid,
                displayName,
                email
            })
            navigate("/")
            console.log(ref);
        } catch {
            setError("Failed to create an account")
        }
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
                <h2>Registration</h2>
                {error && <p className='error'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Full Name' required style={{ marginBottom: "14px" }} />
                    <input type="email" placeholder='Email' required style={{ marginBottom: "14px" }} />
                    <input type="password" placeholder='Password' required style={{ marginBottom: "14px" }} />
                    <button className='btn'>Sign Up</button>
                </form>
                <p className='signup'>You have an account? <Link to="/login">Login</Link></p>
            </div>
        </motion.div>
    )
}
