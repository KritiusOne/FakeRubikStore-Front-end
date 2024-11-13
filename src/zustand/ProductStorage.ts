import { getFormatProducts } from "@/lib/getFormatProducts";
import { Product, ProductMock, Response } from "@/types/ProductsTypes";
import { create } from "zustand";
interface ProductStorageTypes {
  AllProducts: Product[]
  BestProducts: Product[]
  MinPriceValue: number
  MaxPriceValue: number
  getProductsMock: (newProducts: ProductMock[])=> void
  getProducts: (url: string)=> void
  setMinPrice: (newMinPrice: number)=>void
  setMaxPrice: (newMaxPrice: number)=>void
}
export const useProductStorage = create<ProductStorageTypes>((set, get)=>({
  AllProducts: [],
  BestProducts: [],
  MaxPriceValue: 250000,
  MinPriceValue: 0,
  setMinPrice(newMinPrice) {
    const Storage = get()
    if(newMinPrice <= 100000){
      set({...Storage, MinPriceValue: newMinPrice})
    }
  },
  setMaxPrice(newMaxPrice) {
    const Storage = get()
    if(newMaxPrice >= 100000){
      set({...Storage, MaxPriceValue: newMaxPrice})
    }
  },
  getProductsMock: (newProucts)=>{
    const formatersProducts = newProucts.map((product)=>getFormatProducts(product))
    const sortAllProducts = formatersProducts.sort((product)=> product.price)
    set({AllProducts: formatersProducts, BestProducts: sortAllProducts.slice(0, 10)})
  },
  getProducts: async(url)=>{
    const response = await fetch(url)
    if(response.ok){
      const res:Response = await response.json()
      set({AllProducts: res.response, BestProducts: res.response.slice(0, 10)})
    }
  }
}))
