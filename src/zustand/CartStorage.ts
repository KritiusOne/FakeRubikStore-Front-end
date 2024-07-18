import { ProductInCart } from "@/types/ProductsTypes";
import { create } from "zustand";

interface Cart {
  ProductsCart: ProductInCart[]
  viewCart: boolean
  parcialPrice: number
  changeViewCart: (view: boolean) => void
  add: (numberSol: number, id: number, nameProd: string, price: number, img: string) => void
  plusStock: (numProd: number, id: number) => void
}
export const useCartStorage = create<Cart>((set, get) => ({
  ProductsCart: [],
  viewCart: false,
  parcialPrice: 0,
  changeViewCart: (view) => {
    const cartStorage = get()
    set({ ...cartStorage, viewCart: !view })
  },
  add: (numberSol, id, nameProd, price, img) => {
    const cartStorage = get()
    const copy = [...cartStorage.ProductsCart]
    const finded = copy.find((product) => product.id == id)
    if (finded == undefined) {
      copy.push({ id: id, name: nameProd, numberProd: numberSol, price: price, thumbnail: img })
      const costo = copy.reduce((prev, current)=> prev + current.price * current.numberProd, 0)
      set({ ...cartStorage, ProductsCart: copy, parcialPrice: costo })
    }
  },
  plusStock: (numProd, id) => {
    const cartStorage = get()
    const newCart = cartStorage.ProductsCart.map((prod) => {
      if (prod.id == id) {
        prod.numberProd = prod.numberProd + numProd
        return prod
      }
      return prod
    })
    const costo = newCart.reduce((prev, current)=> prev + current.price * current.numberProd, 0)
    set({ ...cartStorage, ProductsCart: newCart, parcialPrice: costo})
  }
}))