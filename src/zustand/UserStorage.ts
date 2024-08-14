import { User } from "@/types/UserTypes";
import { create } from "zustand";
interface UserSesion {
  infoUser: User | null
  activeSesion: boolean
  token: string
  typetoken: string
  loading: boolean
  setUser: (jwt: string, jwtType: string) => void
  logOut: () => void
  haveSesion: ()=>void
}
export const useUserSesion = create<UserSesion>((set)=>({
  infoUser: null,
  activeSesion: false,
  token: "",
  typetoken: "",
  loading: true,
  setUser: (jwt, jwtType)=>{
    const arrJwt = jwt.split(".")
    const transform = atob(arrJwt[1])
    const newUser = JSON.parse(transform)
    localStorage.setItem("token", jwt)
    localStorage.setItem("typetoken", jwtType)
    set({activeSesion: true, infoUser: newUser, token: jwt, typetoken: jwtType, loading: false})
  },
  logOut: ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("typetoken")
    set({activeSesion: false, infoUser: null, token: "", typetoken: "", loading: false})
  },
  haveSesion: ()=>{
    const token = localStorage.getItem("token")
    if(token != null){
      const splitToken = token.split(".")
      const oldUser:User = JSON.parse(atob(splitToken[1]))
      const dateExp = new Date(oldUser.exp * 1000)
      const today = new Date(Date.now())
      if(today < dateExp){
        const typeToken = localStorage.getItem("typetoken") as string
        set({activeSesion: true, infoUser: oldUser, token: token, typetoken: typeToken, loading: false})
      }
    }
    set({loading: false})
  }
}))