import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { Product } from "@/types/ProductsTypes"
import { ResponseBase } from "@/types/ResponseTypes"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const DetailsProduct: React.FC = () => {
  const location = useLocation()
  const [title, setTitle] = useState<string | null>("")
  const [Description, setDescription] = useState<string | null>("")
  const [Img, setImg] = useState<string | null>("")
  //const [Thumbnail, setThumbnail] = useState<string | null>("")
  const [Price, setPrice] = useState<string | null>("")
  const params = new URLSearchParams(location.search)
  useEffect(() => {
    const getImages = async () => {
      const URL = `${import.meta.env.VITE_API_URL_PRODUCT_BY_ID}${params.get("id")}`
      const response = await fetch(URL)
      if (response.ok) {
        const productData: ResponseBase<Product> = await response.json()
        setImg(productData.response.image)
      }
    }
    const newTitle = typeof (params.get("title")) == "string" ? params.get("title") : "Cubo Rubik"
    setTitle(newTitle)
    setDescription(typeof (params.get("description")) == "string" ? params.get("description") : "Cubo Rubik")
    setPrice(typeof (params.get("price")) == "string" ? params.get("price") : "Cubo Rubik")
    getImages()
  }, [])
  return (
    <Layout className="flex justify-center items-center">
      <main className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 justify-center items-center">
        <section className="w-full flex justify-center">
          <img src={Img?.toString()} className="aspect-square" alt="Imagen del producto" />
        </section>
        <section className="w-full text-left flex flex-col justify-start items-start gap-4 text-bgLight px-4">
          <h2 className="font-bold text-3xl w-full"> {title} </h2>
          <strong className="text-xl"> $ {Price} </strong>
          <p className="text-balance max-w-[80ch]">
            {
              Description
            }
          </p>
          <Button title="Agregar al Carrito" className="max-w-full flex text-center text-md rounded-md px-3 justify-between gap-2 items-center bg-primaryRed hover:bg-green transition-colors ease-in-out" />
        </section>
      </main>
    </Layout>
  )
}