import axios from "axios"
import { toast } from "react-toastify"

 const baseURL = process.env.REACT_APP_BASE_URL || "https://dimpo-pbackend.onrender.com";

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/api/auth/register")) {
      const token = localStorage.getItem("token") || getCookie("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    config.withCredentials = true
    return config
  },
  (error) => Promise.reject(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config
    if (error.response?.status === 498 && !originalRequest._retry) {
      originalRequest._retry = true
      toast.dismiss()
      toast.error("Session expired. Please login again.")
      localStorage.removeItem("token")
      localStorage.removeItem("admin")
      deleteCookie("token")
      deleteCookie("admin")
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
      return Promise.reject(error)
    }
    if (error.response?.status === 401) {
      toast.error("Unauthorized access. Please login.")
    }
    return Promise.reject(error)
  },
)

function getCookie(name) {
  if (typeof document === "undefined") return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null
  return null
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export default apiClient
