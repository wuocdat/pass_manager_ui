import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
  {
    key: 'vault',
    path: '/vault',
    component: lazy(() => import('@/pages/app/MyVault')),
    authority: []
  },
  {
    key: 'sharedWithMe',
    path: '/shared',
    component: lazy(() => import('@/pages/app/SharedWithMe')),
    authority: []
  },
  {
    key: 'publicPasswords',
    path: '/public',
    component: lazy(() => import('@/pages/app/PublicPasswords')),
    authority: []
  },
  {
    key: 'activityLog',
    path: '/activity',
    component: lazy(() => import('@/pages/app/ActivityLog')),
    authority: []
  },
  {
    key: 'settings',
    path: '/settings',
    component: lazy(() => import('@/pages/app/Settings')),
    authority: []
  },
  {
    key: 'passwordDetail',
    path: '/passwords/:id',
    component: lazy(() => import('@/pages/app/PasswordDetail')),
    authority: []
  },
  {
    key: 'sharing',
    path: '/sharing',
    component: lazy(() => import('@/pages/app/SharingManagement')),
    authority: []
  },
  {
    key: 'userManagement',
    path: '/users',
    component: lazy(() => import('@/pages/app/UserManagement')),
    authority: ['admin']
  },
]
