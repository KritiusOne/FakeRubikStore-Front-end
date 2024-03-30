import { BestProductsSection } from "@/components/BestProductsSection";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout"
import { CardProduct } from "@/components/ui/CardProduct";
//import response from "@/lib/mocks/products.json"
import { useProductStorage } from "@/zustand/ProductStorage";
import { useURLStorage } from "@/zustand/URLStorage";
import { useEffect } from "react";
export const Home: React.FC = ()=>{
  const products = useProductStorage()
  const url = useURLStorage(urlStorage => urlStorage.Products)
  useEffect(()=>{
    products.getProducts(url)
  }, [])
  return (
    <Layout>
      <main className="w-full p-b-5 px-4 gap-10 flex flex-col justify-around items-center">
        <Hero />
        <BestProductsSection /> 
        <div className="flex flex-col justify-center gap-2 w-full px-5">
          <h2 className="text-2xl md:text-4xl text-center text-bgLight font-bold">Cubos de Rubik</h2>
          <div className="Home__products--section w-full">
            {
              products.AllProducts.map((product, i)=> <CardProduct key={i} title={product.name} price={product.price} originalPrice={product.price} priceOff={0} categories={"no"} thumbnail={product.thumbnail} />)
            }
          </div>
        </div>
      </main>
    </Layout>
  )
}