import { create } from "zustand";

interface URLStorageTypes {
  Products: string 
  Login: string
  GetAddressById: (id:string) => string
  UpdateUser: (id: string) => string
}
export const useURLStorage = create<URLStorageTypes>(()=>({
  Products: import.meta.env.VITE_API_URL_PRODUCTS,
  Login: `${import.meta.env.VITE_API_URL}api/Login`,
  GetAddressById: (id)=>{
    return `${import.meta.env.VITE_API_URL_GET_ADDRESS_BY_ID}${id}`
  },
  UpdateUser: (id) => {
    return `${import.meta.env.VITE_API_URL_UPDATE_USER}${id}`
  }
}))