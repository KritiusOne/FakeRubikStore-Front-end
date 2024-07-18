import { ProductInCart } from "@/types/ProductsTypes";
import { create } from "zustand";

interface Cart {
  ProductsCart: ProductInCart[]
  viewCart: boolean
  changeViewCart: (view: boolean)=>void
}
export const useCartStorage = create<Cart>((set, get)=>({
  ProductsCart: [],
  viewCart: false,
  changeViewCart: (view)=>{
    const cartStorage = get()
    set({...cartStorage, viewCart: !view})
  }
}))