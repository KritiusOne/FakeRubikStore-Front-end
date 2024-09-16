import { create } from "zustand";

interface URLStorageTypes {
  Products: string 
  Login: string
  GetAddressById: (id:string) => string
  UpdateUser: (id: string) => string
  UpdateAddress: (id: number)=> string
  CreateOrder: string
  GetAllOrdersByUser: (id: string, pageNumber: number, pageSize: number) => string
  GetOrderById: (id:string)=> string
  AllOrders: string
  CreateProduct: string
  GetProductByID: string
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
  GetAllOrdersByUser: (id, pageNumber, pageSize)=>{
    const URL_BASE = import.meta.env.VITE_API_URL_GET_ALL_Orders
    const params = new URLSearchParams()
    params.append("IdUser", id)
    params.append("PageSize", pageSize.toString())
    params.append("PageNumber", pageNumber.toString())
    return `${URL_BASE}${params.toString()}`
  },
  AllOrders: import.meta.env.VITE_API_URL_GET_ALL_Orders,
  GetOrderById: (id)=>{
    const URL_BASE = import.meta.env.VITE_API_URL_ORDER_BY_ID
    const params = new URLSearchParams()
    params.append("id", id)
    return `${URL_BASE}${params.toString()} `
  },
  CreateProduct: import.meta.env.VITE_API_URL_CREATE_PRODUCT,
  GetProductByID: import.meta.env.VITE_API_URL_PRODUCT_BY_ID
}))