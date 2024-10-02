import { Spinner } from '@/components/ui/Spinner'
import { useUserSesion } from '@/zustand/UserStorage'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PUBLIC_ROUTES } from './TypesRoutes'

export const SellersAuth_Guard: React.FC = () => {
  const UserSesion = useUserSesion()

  if(UserSesion.loading){
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  return (
    UserSesion.activeSesion && UserSesion.infoUser != null && UserSesion.infoUser.IdRole != "2" ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.HOME} />
  )
}
