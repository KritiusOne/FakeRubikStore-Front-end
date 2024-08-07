import { ProductInCart } from "@/types/ProductsTypes";
import { create } from "zustand";

interface Cart {
  ProductsCart: ProductInCart[]
  viewCart: boolean
  parcialPrice: number
  changeViewCart: (view: boolean) => void
  add: (numberSol: number, id: number, nameProd: string, price: number, img: string) => void
  plusStock: (numProd: number, id: number) => void
  minusStock: (numProd: number, id: number) => void
  removeProduct: (id: number) => void
  changeNumberStock: (id: number, stock: number) => void
  clearCart: ()=> void
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
      const costo = copy.reduce((prev, current) => prev + current.price * current.numberProd, 0)
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
    const costo = newCart.reduce((prev, current) => prev + current.price * current.numberProd, 0)
    set({ ...cartStorage, ProductsCart: newCart, parcialPrice: costo })
  },
  minusStock: (numProd, id) => {
    const cartStorage = get()
    const finded = cartStorage.ProductsCart.find((prod) => prod.id == id)
    if (finded != undefined && finded.numberProd - numProd > 0) {
      finded.numberProd = finded.numberProd - numProd
      const copy = [...cartStorage.ProductsCart]
      const newCart = copy.map((producto) => {
        if (producto.id == id) {
          return finded
        }
        return producto
      })
      const newParcialPrice = newCart.reduce((prev, current)=>prev + current.price * current.numberProd, 0)
      console.log(newParcialPrice)
      set({ ...cartStorage, ProductsCart: newCart, parcialPrice: newParcialPrice })
    }
  },
  removeProduct: (id)=>{
    const cartStorage = get()
    const newCart = cartStorage.ProductsCart.filter(product => product.id != id)
    const newParcialPrice = newCart.reduce((prev, current)=> prev + current.price * current.numberProd, 0)
    set({...cartStorage, ProductsCart: newCart, parcialPrice: newParcialPrice})
  },
  changeNumberStock: (id, stock)=>{
    const cart = get()
    const newCart = cart.ProductsCart.map(product => {
      if(product.id == id){
        product.numberProd = stock
      }
      return product
    })
    const newParcialPrice = newCart.reduce((prev, current)=> prev + current.price * current.numberProd, 0)
    set({...cart, ProductsCart: newCart, parcialPrice: newParcialPrice})
  },
  clearCart: ()=>{
    const actualCart = get()
    set({...actualCart, ProductsCart: [], parcialPrice: 0})
  }
}))