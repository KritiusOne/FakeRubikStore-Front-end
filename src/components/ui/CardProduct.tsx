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
  image: string
  description: string
  stock: number
}
export const CardProduct: React.FC<Props> = ({ productId, title, thumbnail, price, image, description, stock, ...props }) => {
  const baseURL = PUBLIC_ROUTES.VIEW_PRODUCT.split(":")
  const urlParams = new URLSearchParams()
  urlParams.set("title", title)
  urlParams.set("id", productId.toString())
  urlParams.set("price", price.toString())
  urlParams.set("description", description)
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
        <Button title="Add cart" className={"max-w-32 flex text-center text-md rounded-md px-3 bg-primaryRed justify-between gap-2 items-center hover:bg-tomato transition-colors ease-in-out"} Icon={CartIcon} />
        <Button title="Ver" className="max-w-32 flex text-center text-md rounded-md px-3 justify-between gap-2 items-center bg-bgDark hover:bg-green transition-colors ease-in-out" Icon={ArrowRightIcon}
          onClick={() => navegate(`${finalURL}`)} />
      </footer>
    </article>
  )
}