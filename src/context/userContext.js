import { create } from "zustand"
import { toast } from "react-toastify"

// Cookie helper functions
const setCookie = (name, value, days) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  const isLocalhost = window.location.hostname === "localhost"
  const secure = isLocalhost ? "" : ";Secure"
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict${secure}`
}

const getCookie = (name) => {
  if (typeof window === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

function isApiError(error) {
  return typeof error === "object" && error !== null && "message" in error
}

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  initializeAuth: () => {
    const userCookie = getCookie("user")
    const token = localStorage.getItem("token") || getCookie("token")
    if (userCookie && token) {
      try {
        const user = JSON.parse(userCookie)
        console.log("initializeAuth - Restored user:", user)
        set({ user, token })
      } catch (e) {
        console.error("Failed to parse user cookie", e)
      }
    } else {
      console.log("initializeAuth - No user or token cookies found")
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const baseURL = import.meta.env.REACT_APP_BASE_URL || "https://dimpo-pbackend.onrender.com"
      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()
      console.log("Login - Response:", data)

      const user = data.data?.user || data.user
      const token = data.data?.token || data.token

      if (!user || !token) {
        throw new Error("Invalid response format from server")
      }

      localStorage.setItem("token", token)
      setCookie("user", JSON.stringify(user), 15)
      setCookie("token", token, 15)

      set({ user, token, isLoading: false })
      toast.success("Login successful")
    } catch (error) {
      const errorMessage = isApiError(error)
        ? error.message
        : error instanceof Error
          ? error.message
          : "An unknown error occurred"
      set({ error: errorMessage, isLoading: false })
      toast.error(errorMessage)
      throw error
    }
  },

  register: async (userData) => {
    set({ isLoading: true, error: null })
    const apiData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmpassword,
      role: "admin",
    }

    try {
      const baseURL = import.meta.env.REACT_APP_BASE_URL || "https://dimpo-pbackend.onrender.com"
      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.message || data.error || "Registration failed"
        throw new Error(errorMessage)
      }

      const user = data.user || data.data?.user
      const token = data.token || data.data?.token

      if (!user || !token) {
        throw new Error("Invalid response format from server")
      }

      localStorage.setItem("token", token)
      setCookie("user", JSON.stringify(user), 15)
      setCookie("token", token, 15)

      set({ user, token, isLoading: false })
      toast.success("Registration successful")
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      console.error("Registration error:", error)
      set({ error: errorMessage, isLoading: false })
      toast.error(errorMessage)
      throw error
    }
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem("token")
    localStorage.removeItem("admin")
    deleteCookie("user")
    deleteCookie("token")
    deleteCookie("admin")
    toast.success("Logged out successfully.")
  },

  clearError: () => set({ error: null }),
}))
