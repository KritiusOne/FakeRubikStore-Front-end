import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout"
import { CardProduct } from "@/components/ui/CardProduct";
import response from "@/lib/mocks/products.json"
import { useEffect, useState } from "react"
interface MockProducts {
  id:                 number;
  title:              string;
  description:        string;
  price:              number;
  discountPercentage: number;
  rating:             number;
  stock:              number;
  brand:              string;
  category:           string;
  thumbnail:          string;
  images:             string[];
}
export const Home: React.FC = ()=>{
  const [products, setProducts] = useState<MockProducts[] | null>(null)
  useEffect(()=>{
    const newProducts = response.products
    setProducts(newProducts)
  }, [])
  console.log(products)
  return (
    <Layout>
      <main className="p-b-5 px-10">
        <Hero />
      </main>
    </Layout>
  )
}