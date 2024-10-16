import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { Comment } from "@/components/ui/Comment"
import { Divider } from "@/components/ui/Divider"
import { CartIcon } from "@/components/ui/icons/CartIcon"
import { ProgressBar } from "@/components/ui/Progressbar"
import { Spinner } from "@/components/ui/Spinner"
import { Stars } from "@/components/ui/Stars"
import { RouteImage } from "@/lib/CreateRouteImage"
import { PRIVATE_USER_ROUTES } from "@/routes/TypesRoutes"
import { AllDataProduct } from "@/types/ProductsTypes"
import { ResponseBase } from "@/types/ResponseTypes"
import { useCartStorage } from "@/zustand/CartStorage"
import { IconStarFilled } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
export const DetailsProduct: React.FC = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [productDatails, setProductsDetails] = useState<AllDataProduct>()
  const [numStars, setNumStars] = useState<number>(0)
  const addToCart = useCartStorage(Storage => Storage.add)
  const navegate = useNavigate()
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const getProduct = async () => {
      try {
        const URL = `${import.meta.env.VITE_API_URL_PRODUCT_BY_ID}${params.get("id")}`
        setLoad(true)
        const response = await fetch(URL)
        if (response.ok) {
          const productData: ResponseBase<AllDataProduct> = await response.json()
          const sumRate = productData.response.reviews.reduce((prev, current) => current.rate + prev, 0)
          const promRate = sumRate / productData.response.reviews.length
          setProductsDetails(productData.response)
          setNumStars(isNaN(promRate) ? 0 : promRate)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }

    }
    window.scroll(0, 0)
    getProduct()
  }, [])
  const handleClickAdd = () => {
    if (productDatails != undefined) {
      addToCart(1, productDatails.id, productDatails.name, productDatails.price, productDatails.thumbnail)
    }
  }
  const handleMakeBuyNow = () => {
    if (productDatails != undefined) {
      addToCart(1, productDatails.id, productDatails.name, productDatails.price, productDatails.thumbnail)
      navegate(PRIVATE_USER_ROUTES.MAKE_BUY)
    }
  }
  return (
    <Layout className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-bgLight my-6 py-2">
        {
          load && <Spinner />
        }
        {
          !load && productDatails != undefined && (
            <main className="flex flex-col md:grid md:grid-cols-3 justify-center items-center lg:min-w-[800px] max-w-full px-6 py-4 text-bgDark mx-6 rounded-md">
              <section>
                <img src={RouteImage(productDatails.image)} alt={`Imagen del ${productDatails.name}`} />
              </section>
              <section className="flex flex-col justify-center items-center px-4 text-center mt-4 md:mt-0">
                <h1 className="text-3xl w-full"> {productDatails.name} </h1>
                <strong className="text-xl"> {productDatails.price} </strong>
                <Stars numStars={numStars} size="large" />
                <p className="text-balance">
                  {productDatails?.description}
                </p>
              </section>
              <section className="flex flex-col justify-center items-center gap-4">
                <span>Stock disponible: {productDatails.stock} </span>
                <Button onClick={handleClickAdd} size="extraLarge" className="flex flex-row justify-center items-center gap-2 text-lg"> <span>Agregar al carrito</span> <CartIcon /> </Button>
                <Button onClick={handleMakeBuyNow} primary={true} size="extraLarge" className="flex flex-row justify-center items-center gap-2 text-lg "> <span>Comprar ahora</span> <CartIcon /> </Button>
              </section>
            </main>
          )
        }
        <Divider />
        <section className="flex flex-col justify-center items-center w-full">
          <h2 className="text-2xl text-pretty">Opiniones del producto</h2>
          <div className="grid grid-cols-2 gap-2 justify-center items-center w-full">
            <div className="max-w-full flex flex-col justify-end px-5">
              <div className="flex md:flex-row flex-col justify-center items-center md:gap-4 gap-1">
                <h3 className="text-3xl"> {numStars.toFixed(1)} </h3>
                <div className="flex flex-col">
                  <Stars numStars={numStars} size="small" />
                  <span> {productDatails?.reviews.length} Calificacion(es) </span>
                </div>
              </div>
              <div className="flex flex-row justify-end items-center gap-2 flex-1">
                <ProgressBar typeBar="5" reviews={productDatails?.reviews} />
                5 <IconStarFilled className="text-yellow-300" height={16} />
              </div>
              <div className="flex flex-row justify-center items-center gap-2 flex-1">
                <ProgressBar typeBar="4" reviews={productDatails?.reviews} />
                4 <IconStarFilled className="text-yellow-300" height={16} />
              </div>
              <div className="flex flex-row justify-center items-center gap-2 flex-1">
                <ProgressBar typeBar="3" reviews={productDatails?.reviews} />
                3 <IconStarFilled height={16} className="text-yellow-300" />
              </div>
              <div className="flex flex-row justify-center items-center gap-2 flex-1">
                <ProgressBar typeBar="2" reviews={productDatails?.reviews} />
                2 <IconStarFilled height={16} className="text-yellow-300" />
              </div>
              <div className="flex flex-row justify-center items-center gap-2 flex-1">
                <ProgressBar typeBar="1" reviews={productDatails?.reviews} />
                1 <IconStarFilled height={16} className="text-yellow-300" />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center">
              {
                productDatails && productDatails?.reviews.map((review) => <Comment description={review.description} rate={review.rate} key={review.userId} />)
              }
            </div>
          </div>
        </section>

      </div>
    </Layout>
  )
}