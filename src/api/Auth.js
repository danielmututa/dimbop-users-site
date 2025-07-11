import axios from "axios"
import { apiClient } from "../context/axios"

export const loginApi = async (data) => {
  try {
    const response = await apiClient.post("/api/auth/login", data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data
      const errorMessage =
        backendError?.message || (typeof backendError === "string" ? backendError : null) || "Login failed"
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}

export const RegisterApi = async (data) => {
  try {
    const response = await apiClient.post("/api/auth/register", data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendErrorMessage =
        error.response?.data?.message || error.response?.data?.error || error.response?.data || "Registration failed"
      throw new Error(backendErrorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}

export const ChangePasswordApi = async (data) => {
  try {
    const response = await apiClient.post("/api/auth/change-password", data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data
      const errorMessage =
        backendError?.message || (typeof backendError === "string" ? backendError : null) || "Password change failed"
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}

export const ResetPasswordApi = async (data) => {
  try {
    const response = await apiClient.post("/api/auth/reset-password", data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data
      const errorMessage =
        backendError?.message || (typeof backendError === "string" ? backendError : null) || "Password reset failed"
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}

export const ForgetPasswordApi = async (data) => {
  try {
    const response = await apiClient.post("/api/auth/forgot-password", data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data
      const errorMessage =
        backendError?.message || (typeof backendError === "string" ? backendError : null) || "Password reset failed"
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}

export const DeleteApi = async (userId) => {
  try {
    const response = await apiClient.delete(`/api/auth/users/${userId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const backendError = error.response?.data
      const errorMessage =
        backendError?.message || (typeof backendError === "string" ? backendError : null) || "Deletion failed"
      throw new Error(errorMessage)
    }
    throw new Error("An unexpected error occurred")
  }
}
