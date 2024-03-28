import { create } from "zustand";

interface URLStorageTypes {
  Products: string 
  Login: string
}
export const useURLStorage = create<URLStorageTypes>((get, set)=>({
  Products: import.meta.env.VITE_API_URL_PRODUCTS,
  Login: `${import.meta.env.VITE_API_URL}api/Login`
}))