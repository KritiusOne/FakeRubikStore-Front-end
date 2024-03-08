import { User } from "@/types/UserTypes";
import { create } from "zustand";
interface UserSesion extends User {
  activeSesion: boolean
  setUser: () => void
}
export const useUserSesion = create<UserSesion>((set)=>({
  id: 0,
  idRole: 0,
  idAddress:  0,
  name: "",
  secondName: "",
  email: "",
  phone: "",
  activeSesion: false,
  setUser: ()=>set((state)=>({
    id:state.id,
    idRole: state.idRole,
    idAddress: state.idAddress,
    email: state.email,
    name: state.name,
    secondName: state.secondName,
    phone: state.phone,
  }))
}))