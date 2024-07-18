import { ProductInCart } from "@/types/ProductsTypes";
import { create } from "zustand";

interface Cart {
  ProductsCart: ProductInCart[]
  viewCart: boolean
  changeViewCart: (view: boolean)=>void
  add: (numberSol:number, id: number, nameProd: string, price: number, img: string)=>void
}
export const useCartStorage = create<Cart>((set, get)=>({
  ProductsCart: [],
  viewCart: false,
  changeViewCart: (view)=>{
    const cartStorage = get()
    set({...cartStorage, viewCart: !view})
  },
  add: (numberSol, id, nameProd, price, img)=>{
    const cartStorage = get()
    const copy = [...cartStorage.ProductsCart]
    const finded = copy.find((product)=> product.id == id)
    if(finded == undefined){
      copy.push({id: id, name: nameProd, numberProd: numberSol, price: price, thumbnail: img})
      set({viewCart: cartStorage.viewCart, ProductsCart: copy})
    }
  }
}))