import { User } from "@/types/UserTypes";
import { create } from "zustand";
interface UserSesion {
  infoUser: User | null
  activeSesion: boolean
  token: string
  typetoken: string
  setUser: (jwt: string, jwtType: string) => void
}
export const useUserSesion = create<UserSesion>((set)=>({
  infoUser: null,
  activeSesion: false,
  token: "",
  typetoken: "",
  setUser: (jwt, jwtType)=>{
    const arrJwt = jwt.split(".")
    const transform = atob(arrJwt[1])
    const newUser = JSON.parse(transform)
    localStorage.setItem("token", arrJwt[1])
    localStorage.setItem("typetoken", jwtType)
    set({activeSesion: true, infoUser: newUser, token: jwt, typetoken: jwtType})
  }
}))