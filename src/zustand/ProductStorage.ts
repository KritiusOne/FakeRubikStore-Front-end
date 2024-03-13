import { getFormatProducts } from "@/lib/getFormatProducts";
import { Product, ProductMock } from "@/types/ProductsTypes";
import { create } from "zustand";
interface ProductStorageTypes {
  AllProducts: Product[]
  BestProducts: Product[]
  getProductsMock: (newProducts: ProductMock[])=> void
}
export const useProductStorage = create<ProductStorageTypes>((set, get)=>({
  AllProducts: [],
  BestProducts: [],
  getProductsMock: (newProucts)=>{
    const formatersProducts = newProucts.map((product)=>getFormatProducts(product))
    const sortAllProducts = formatersProducts.sort((product)=> product.rating)
    set({AllProducts: formatersProducts, BestProducts: sortAllProducts.slice(0, 10)})
  },
}))
