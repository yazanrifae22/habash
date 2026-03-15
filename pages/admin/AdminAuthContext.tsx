import { createContext, ReactNode, useContext, useState } from 'react'

const WORKER_URL = import.meta.env.VITE_WORKER_URL || ''
const TOKEN_KEY = 'habash_admin_token'

interface AdminAuthContextType {
  token: string | null
  login: (password: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))

  const login = async (password: string) => {
    const res = await fetch(`${WORKER_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!res.ok) {
      const err = (await res.json()) as { error: string }
      throw new Error(err.error || 'Login failed')
    }
    const { token: newToken } = (await res.json()) as { token: string }
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return (
    <AdminAuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}

// Shared fetch helper for authenticated requests
export const adminFetch = (token: string, path: string, options: RequestInit = {}) =>
  fetch(`${WORKER_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  })

export const WORKER_URL_EXPORT = WORKER_URL
