import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { CartIcon } from "@/components/ui/icons/CartIcon"
import { AllDataProduct } from "@/types/ProductsTypes"
import { ResponseBase } from "@/types/ResponseTypes"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const DetailsProduct: React.FC = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [productDatails, setProductsDetails] = useState<AllDataProduct>()
  useEffect(() => {
    const getProduct = async () => {
      const URL = `${import.meta.env.VITE_API_URL_PRODUCT_BY_ID}${params.get("id")}`
      const response = await fetch(URL)
      console.log(response)
      if (response.ok) {
        const productData: ResponseBase<AllDataProduct> = await response.json()
        setProductsDetails(productData.response)
      }
    }
    getProduct()
  }, [])
  return (
    <Layout className="flex justify-center items-center">
      <main className="flex flex-col md:grid md:grid-cols-3 justify-center items-center lg:min-w-[800px] max-w-full px-6 py-4 bg-bgLight text-bgDark mx-6">
        <section>
          <img src={productDatails?.image} alt={`Imagen del ${productDatails?.name}`} />
        </section>
        <section className="flex flex-col justify-center items-center px-4">
          <h1 className="text-pretty text-3xl"> {productDatails?.name} </h1>
          <strong className="text-xl"> {productDatails?.price} </strong>
          <span> Aqui van las calificaciones </span>
          <p className="text-balance">
            {productDatails?.description}
          </p>
        </section>
        <section className="flex flex-col justify-center items-center gap-4">
          <span>Stock disponible: {productDatails?.stock} </span>
          <Button size="extraLarge" className="flex flex-row justify-center items-center gap-2 text-lg"> <span>Agregar al carrito</span> <CartIcon /> </Button>
          <Button primary={true} size="extraLarge" className="flex flex-row justify-center items-center gap-2 text-lg "> <span>Comprar ahora</span> <CartIcon /> </Button>
        </section>
      </main>
    </Layout>
  )
}