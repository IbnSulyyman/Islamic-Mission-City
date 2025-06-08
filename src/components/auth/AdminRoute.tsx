import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import LoadingSpinner from '../Common/LoadingSpinner'

interface AdminRouteProps {
  children: ReactNode
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { isAuthenticated, isAdmin, loading } = useAuthContext()

  if (loading) {
    return <LoadingSpinner />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige-500">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-navy-500 mb-4 font-arabic">
            غير مصرح لك بالوصول
          </h1>
          <p className="text-navy-500/70 font-arabic">
            هذه الصفحة مخصصة للمشرفين فقط
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default AdminRoute
