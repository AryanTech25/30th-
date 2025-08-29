"use client"

import React, { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useAuth } from "@/contexts/auth-context"

export interface WishlistItem {
  itemType: 'course' | 'tool'
  id: string
  title: string
  instructor: string
  description: string
  level: string
  duration: string
  students: number
  rating: number
  reviews: number
  price: string
  thumbnail: string
  tags: string[]
  instructorAvatar?: string
  website?: string
  addedAt: Date
}

interface WishlistContextType {
  wishlist: WishlistItem[]
  addToWishlist: (item: Omit<WishlistItem, 'addedAt'>) => void
  removeFromWishlist: (id: string, itemType?: 'course' | 'tool') => void
  isInWishlist: (id: string, itemType?: 'course' | 'tool') => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { user, loading: authLoading } = useAuth()

  const storageKey = useMemo(() => {
    const userKey = user?.id || user?.email || "guest"
    return `aiverse-wishlist:${userKey}`
  }, [user])

  // Load wishlist from localStorage when auth user changes
  useEffect(() => {
    try {
      // Prefer user-scoped key
      const scoped = localStorage.getItem(storageKey)
      if (scoped) {
        const parsed = JSON.parse(scoped)
        const wishlistWithDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        setWishlist(wishlistWithDates)
        return
      }

      // Migrate from legacy global key if present
      const legacy = localStorage.getItem("aiverse-wishlist")
      if (legacy) {
        const parsed = JSON.parse(legacy)
        const wishlistWithDates = parsed.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }))
        setWishlist(wishlistWithDates)
        localStorage.setItem(storageKey, JSON.stringify(parsed))
      } else {
        setWishlist([])
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error)
      setWishlist([])
    }
  }, [storageKey])

  // Save wishlist to user-scoped localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlist))
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error)
    }
  }, [wishlist, storageKey])

  const addToWishlist = (course: Omit<WishlistItem, 'addedAt'>) => {
    setWishlist(prev => {
      // Check if course is already in wishlist
      if (prev.find(item => item.id === course.id && item.itemType === (course as any).itemType)) {
        return prev
      }
      return [...prev, { ...course, itemType: (course as any).itemType || 'course', addedAt: new Date() }]
    })
  }

  const removeFromWishlist = (courseId: string, itemType?: 'course' | 'tool') => {
    setWishlist(prev => prev.filter(item => item.id !== courseId || (itemType ? item.itemType !== itemType : false)))
  }

  const isInWishlist = (courseId: string, itemType?: 'course' | 'tool') => {
    return wishlist.some(item => item.id === courseId && (itemType ? item.itemType === itemType : true))
  }

  const clearWishlist = () => {
    setWishlist([])
  }

  const wishlistCount = wishlist.length

  const value: WishlistContextType = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
