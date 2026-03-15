import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../pages/admin/AdminAuthContext'

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAdminAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />
}

export default ProtectedAdminRoute
