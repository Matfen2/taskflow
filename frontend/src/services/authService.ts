import api from '../api/axios'
import type { AuthResponse } from '../types'

export const register = async (email: string, password: string) => {
  const res = await api.post('/auth/register', { email, password })
  return res.data
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/login', { email, password })
  return res.data
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}