





import { create } from "zustand"
import { toast } from "react-toastify" // Reverted to react-toastify

// Cookie helper functions
const setCookie = (name, value, days) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost"
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
        // Clear potentially corrupted cookies/localStorage
        localStorage.removeItem("token")
        deleteCookie("user")
        deleteCookie("token")
      }
    } else {
      console.log("initializeAuth - No user or token cookies found")
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      // Using REACT_APP_BASE_URL as per your original code for client-side env vars
      const baseURL = process.env.REACT_APP_BASE_URL || "REACT_APP_BASE_URL=https://dimpo-pbackend.onrender.com"
      console.log("Login - Using baseURL:", baseURL)

      const response = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        credentials: 'include', // ← ADDED THIS LINE
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
    try {
      console.log("Attempting to register with:", userData)
      const baseURL = process.env.REACT_APP_BASE_URL || "REACT_APP_BASE_URL=https://dimpo-pbackend.onrender.com"
      console.log("Register - Using baseURL:", baseURL)

      const response = await fetch(`${baseURL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: 'include', // ← ADDED THIS LINE
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword,
          role: "admin",
        }),
      })

      console.log("Received response status:", response.status)

      if (!response.ok) {
        let errorText
        try {
          errorText = await response.text()
          const errorData = JSON.parse(errorText)
          console.error("Registration failed response:", errorData)
          throw new Error(errorData.message || "Registration failed")
        } catch (e) {
          console.error("Failed to parse error response:", e)
          throw new Error(errorText || "Registration failed due to server error")
        }
      }

      const data = await response.json()
      console.log("Registration successful data:", data)

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
      return { success: true, user }
    } catch (error) {
      console.error("Full registration error:", error)
      const errorMessage = error instanceof Error ? error.message : "Registration failed due to network error"
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