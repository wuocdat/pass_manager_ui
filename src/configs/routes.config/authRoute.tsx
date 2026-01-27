import {lazy} from 'react'
import type {Routes} from '@/@types/routes'

const authRoute: Routes = [
  {
    key: 'signIn',
    path: `/sign-in`,
    component: lazy(() => import('@/pages/auth/SignIn')),
    authority: []
  },
  {
    key: 'signUp',
    path: `/register`,
    component: lazy(() => import('@/pages/auth/Register')),
    authority: []
  },
  {
    key: 'forgotPassword',
    path: `/forgot-password`,
    component: lazy(() => import('@/pages/auth/ForgotPassword')),
    authority: []
  },
  {
    key: 'changePassword',
    path: `/change-password`,
    component: lazy(() => import('@/pages/auth/ChangePasswordFirstLogin')),
    authority: []
  },
]

export default authRoute
