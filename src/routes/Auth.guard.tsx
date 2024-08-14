import { useUserSesion } from "@/zustand/UserStorage"
import { Outlet, Navigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "./TypesRoutes"
import { Spinner } from "@/components/ui/Spinner"

export const Auth_Guard: React.FC = ()=>{
  const {activeSesion, loading} = useUserSesion((state)=> ({activeSesion: state.activeSesion,
     loading: state.loading}))
  if(loading){
    return (
      <div className="flex justify-center items-center p-10">
        <Spinner />
      </div>
    )
  }
  return (
    activeSesion ? <Outlet /> : <Navigate replace to={PUBLIC_ROUTES.LOGIN} />
  )
}