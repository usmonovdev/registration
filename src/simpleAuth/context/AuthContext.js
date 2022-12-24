import React, { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signOut, updateEmail, updatePassword } from 'firebase/auth'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateSetEmail(email) {
        return updateEmail(auth.currentUser, email)
    }

    function updateSetPassword(password) {
        return updatePassword(auth.currentUser, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            console.log(user);
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, []);

    const value = {
        currentUser,
        logout,
        signup,
        resetPassword,
        updateSetEmail,
        updateSetPassword
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
