import { create } from "zustand";

interface URLStorageTypes {
  Products: string 
  Login: string
  GetAddressById: (id:string) => string
  UpdateUser: (id: string) => string
  UpdateAddress: (id: number)=> string
  CreateOrder: string
  GetAllOrdersByUser: (id: string) => string
}
export const useURLStorage = create<URLStorageTypes>(()=>({
  Products: import.meta.env.VITE_API_URL_PRODUCTS,
  Login: `${import.meta.env.VITE_API_URL}api/Login`,
  GetAddressById: (id)=>{
    return `${import.meta.env.VITE_API_URL_GET_ADDRESS_BY_ID}${id}`
  },
  UpdateUser: (id) => {
    return `${import.meta.env.VITE_API_URL_UPDATE_USER}${id}`
  },
  UpdateAddress: (id)=>{
    return `${import.meta.env.VITE_API_URL_UPDATE_ADDRESS}${id.toString()}`
  },
  CreateOrder: import.meta.env.VITE_API_URL_CREATE_ORDER,
  GetAllOrdersByUser: (id)=>{
    const URL_BASE = import.meta.env.VITE_API_URL_GET_ALL_Orders
    const params = new URLSearchParams()
    params.append("IdUser", id)
    return `${URL_BASE}${params.toString()}`
  }
}))