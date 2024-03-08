import { useUserSesion } from "@/zustand/UserStorage"
import { Outlet, Navigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "./TypesRoutes"

export const Auth_Guard: React.FC = ()=>{
  const activeSesion = useUserSesion((state)=> state.activeSesion)
  return (
    activeSesion ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.LOGIN} />
  )
}