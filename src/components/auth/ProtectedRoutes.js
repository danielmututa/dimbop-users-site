

import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../context/userContext"
import { useEffect } from "react"

export const ProtectedRoute = () => {
  const { user } = useAuthStore()

  console.log("ProtectedRoute - Current user:", user)

  useEffect(() => {
    console.log("ProtectedRoute mounted with user:", user)
  }, [user])

  if (!user) {
    console.log("No user found - redirecting to login")
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
