import { Navigate, Outlet, useLocation } from 'react-router-dom'
import appConfig from '@/configs/app.config'
import useAuth from '@/utils/hooks/useAuth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
  const { authenticated, mustChangePassword } = useAuth()
  const location = useLocation()

  if (mustChangePassword && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" />
  }

  return authenticated ? <Navigate to={authenticatedEntryPath} /> : <Outlet />
}

export default PublicRoute
