import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
  const { authenticated, mustChangePassword } = useAuth()

  const location = useLocation()

  if (mustChangePassword) {
    return <Navigate replace to="/change-password" />
  }

  if (!authenticated) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
