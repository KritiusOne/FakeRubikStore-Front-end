import { Layout } from "@/components/Layout"
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
  useEffect(()=>{
    const newTitle = typeof(params.get("title")) == "string" ? params.get("title") : "Cubo Rubik"
    setTitle(newTitle)
    setImg(typeof(params.get("thumbnail")) == "string" ? params.get("thumbnail") : "Cubo Rubik")
    setDescription(typeof(params.get("description")) == "string" ? params.get("description") : "Cubo Rubik")
    setPrice(typeof(params.get("price")) == "string" ? params.get("price") : "Cubo Rubik")
  }, [])
  return (
    <Layout className="flex justify-center items-center">
      <main className="flex flex-col md:grid md:grid-cols-2 w-full gap-6 justify-center items-center">
        <section className="w-full flex justify-center">
          <img src={Img?.toString()} className="aspect-square" alt="Imagen del producto" />
        </section>
        <section className="w-full text-left flex flex-col justify-start items-start gap-4 text-bgLight">
          <h2 className="font-bold text-3xl w-full"> {title} </h2>
          <p className="text-balance max-w-[80ch]">
            {
              Description
            }
          </p>
          <strong> ${Price} </strong>
        </section>
      </main>
    </Layout>
  )
}