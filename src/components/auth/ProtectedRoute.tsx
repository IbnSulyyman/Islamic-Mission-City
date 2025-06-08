import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import LoadingSpinner from '../Common/LoadingSpinner'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
