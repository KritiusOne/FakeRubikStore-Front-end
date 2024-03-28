import { getFormatProducts } from "@/lib/getFormatProducts";
import { Product, ProductMock, Response } from "@/types/ProductsTypes";
import { create } from "zustand";
interface ProductStorageTypes {
  AllProducts: Product[]
  BestProducts: Product[]
  getProductsMock: (newProducts: ProductMock[])=> void
  getProducts: (url: string)=> void
}
export const useProductStorage = create<ProductStorageTypes>((set, get)=>({
  AllProducts: [],
  BestProducts: [],
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
