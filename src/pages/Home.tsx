import { BestProductsSection } from "@/components/BestProductsSection";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout"
import { CardProduct } from "@/components/ui/CardProduct";
//import response from "@/lib/mocks/products.json"
import { useProductStorage } from "@/zustand/ProductStorage";
import { useURLStorage } from "@/zustand/URLStorage";
import { useEffect } from "react";
export const Home: React.FC = () => {
  const products = useProductStorage()
  const url = useURLStorage(urlStorage => urlStorage.Products)
  useEffect(() => {
    products.getProducts(url)
  }, [])
  return (
    <Layout>
      <main className="max-w-full p gap-10 flex flex-col justify-around items-center my-6">
        <Hero />
        <BestProductsSection />
        <div className="flex flex-col justify-center gap-2 w-full px-5">
          <h2 className="text-2xl md:text-4xl text-center text-bgLight font-bold">Cubos de Rubik</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full px-4">
            {
              products.AllProducts.map((product) => <CardProduct key={product.id}
                price={product.price}
                productId={product.id}
                thumbnail={product.thumbnail}
                title={product.name} />)
            }
          </div>
        </div>
      </main>
    </Layout>
  )
}