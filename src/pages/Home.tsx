import { BestProductsSection } from "@/components/BestProductsSection";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout"
import response from "@/lib/mocks/products.json"
import { useProductStorage } from "@/zustand/ProductStorage";
import { useEffect } from "react";
export const Home: React.FC = ()=>{
  const products = useProductStorage()
  useEffect(()=>{
    products.getProductsMock(response.products)
  }, [])
  return (
    <Layout>
      <main className="p-b-5 px-10 flex flex-col justify-around items-center">
        <Hero />
        <BestProductsSection /> 
      </main>
    </Layout>
  )
}