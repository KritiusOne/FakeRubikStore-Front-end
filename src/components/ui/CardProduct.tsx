import { HTMLAttributes } from "react"
import { Button } from "./Button"
import { CartIcon } from "./icons/CartIcon"
import { ArrowRightIcon } from "./icons/ArrowRightIcon"
import { useNavigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"

interface Props extends HTMLAttributes<HTMLElement> {
  productId: number
  title: string
  thumbnail: string
  price: number
}
export const CardProduct: React.FC<Props> = ({ productId, title, thumbnail, price, ...props }) => {
  const baseURL = PUBLIC_ROUTES.VIEW_PRODUCT.split(":")
  const urlParams = new URLSearchParams()
  urlParams.set("id", productId.toString())
  const finalURL = `${baseURL[0]}${baseURL[1]}?${urlParams.toString()}`
  const navegate = useNavigate()
  return (
    <article {...props} className={`relative flex flex-col justify-center items-center bg-bgLight gap-2 rounded-md overflow-hidden w-full ${props.className}`}>
      <header className="w-full flex-grow"> <img className="w-full h-full aspect-video" src={thumbnail} alt={`Miniatura del producto ${title}`} /> </header>
      <h3 className="font-semibold text-center text-xl text-pretty px-3"> {title} </h3>
      <section className="flex flex-row justify-center items-center gap-4">
        <h2 className="font-bold text-xl text-pretty text-center text-primaryRed">  ${price} </h2>
      </section>
      <footer className="flex flex-col md:flex-row justify-center items-center w-full gap-3 pb-2 px-2">
        <Button size="extraLarge" primary={true} className={"max-w-32 flex text-center text-md rounded-md justify-between gap-2 items-center hover:border-tomato hover:bg-tomato transition-colors ease-in-out text-bgLight"}> <span className="text-sm">Add Cart</span> <CartIcon /></Button>
        <Button size="large" className="max-w-32 flex text-center text-md rounded-md px-3 justify-between gap-2 items-center hover:border-green hover:bg-green transition-colors ease-in-out text-bgLight" 
          onClick={() => navegate(`${finalURL}`)} > <span className="text-md">Ver</span> <ArrowRightIcon /> </Button>
      </footer>
    </article>
  )
}