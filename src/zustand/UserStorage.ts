import { User } from "@/types/UserTypes";
import { create } from "zustand";
interface UserSesion extends User {
  activeSesion: boolean
  setUser: (newUser: User) => void
}
export const useUserSesion = create<UserSesion>((set)=>({
  id: 0,
  idRole: 0,
  idAddress:  0,
  name: "",
  secondName: "",
  email: "",
  phone: "",
  password: "",
  activeSesion: false,
  setUser: (newUser: User)=>set(()=>({
    id:newUser.id,
    idRole: newUser.idRole,
    idAddress: newUser.idAddress,
    email: newUser.email,
    name: newUser.name,
    secondName: newUser.secondName,
    phone: newUser.phone,
    activeSesion: true
  }))
}))