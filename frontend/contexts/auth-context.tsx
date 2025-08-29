"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

interface User {
  id: string
  username: string
  name: string
  surname: string
  email: string
}

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (username: string, name: string, surname: string, email: string, password: string, confirmPassword: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token")
        if (token) {
          // For now, we'll get user info from localStorage
          // You can add a /me endpoint to your backend later
          const userStr = localStorage.getItem("user")
          if (userStr) {
            const user = JSON.parse(userStr)
            setState({ user, loading: false, error: null })
          } else {
            setState({ user: null, loading: false, error: null })
          }
        } else {
          setState({ user: null, loading: false, error: null })
        }
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setState({ user: null, loading: false, error: null })
      }
    }

    checkAuthStatus()
  }, [])

  // Email + Password login
  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/auth/login`, { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const { success, data } = response.data
      
      if (success && data) {
        const { token, user } = data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setState({ user, loading: false, error: null })
        
        // Check if there's a redirect destination
        const redirectPath = localStorage.getItem("redirectAfterLogin")
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin")
          window.location.href = redirectPath
        }
      } else {
        throw new Error("Login failed")
      }
    } catch (err: any) {
      console.error("Sign in error:", err.response?.data || err.message)
      const details = err.response?.data?.error?.details
      const errorMessage = details?.map((d: any) => d.message).join(", ")
        || err.response?.data?.error?.message
        || err.response?.data?.message
        || "Sign in failed"
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw new Error(errorMessage)
    }
  }

  // Email + Password sign up
  const signUp = async (username: string, name: string, surname: string, email: string, password: string, confirmPassword: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/auth/signup`, { 
        username, 
        name, 
        surname, 
        email, 
        password, 
        confirmPassword 
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      const { success, data } = response.data
      
      if (success && data) {
        const { token, user } = data
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))
        setState({ user, loading: false, error: null })
        
        // Check if there's a redirect destination
        const redirectPath = localStorage.getItem("redirectAfterLogin")
        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin")
          window.location.href = redirectPath
        }
      } else {
        throw new Error("Sign up failed")
      }
    } catch (err: any) {
      console.error("Sign up error:", err.response?.data || err.message)
      const details = err.response?.data?.error?.details
      const errorMessage = details?.map((d: any) => d.message).join(", ")
        || err.response?.data?.error?.message
        || err.response?.data?.message
        || "Sign up failed"
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw new Error(errorMessage)
    }
  }

  // Google sign in
  const signInWithGoogle = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      // TODO: Implement Google OAuth with your backend
      // For now, redirect to backend Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/auth/google`
    } catch (err: any) {
      const errorMessage = "Google sign in failed"
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }))
      throw new Error(errorMessage)
    }
  }

  // Sign out
  const signOut = async () => {
    try {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setState({ user: null, loading: false, error: null })
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        error: "Sign out failed",
      }))
      throw err
    }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      // TODO: Implement password reset with your backend
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3005'}/api/auth/forgot-password`, { email })
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.response?.data?.message || "Password reset failed"
      setState((prev) => ({
        ...prev,
        error: errorMessage,
      }))
      throw new Error(errorMessage)
    }
  }

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
