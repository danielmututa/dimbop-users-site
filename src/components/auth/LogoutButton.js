

import { useAuthStore } from "../../context/userContext"
import { useNavigate } from "react-router-dom"

export const LogoutButton = ({ className = "" }) => {
  const { logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className={`px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors ${className}`}
    >
      Logout
    </button>
  )
}
