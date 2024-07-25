import { ProductInCart } from "@/types/ProductsTypes"
import React from "react"
import { Button } from "./ui/Button"
import { useCartStorage } from "@/zustand/CartStorage"
import { IconX } from "@tabler/icons-react"

interface Props {
  product: ProductInCart
}
export const CardMakeBuy: React.FC<Props> = ({ product }) => {
  const moreProd = useCartStorage(Storage => Storage.plusStock)
  const lowerProd = useCartStorage(Storage => Storage.minusStock)
  const removeProduct = useCartStorage(Storage => Storage.removeProduct)
  return (
    <article className="flex flex-row justify-between items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-full pr-2 rounded-lg">
      <header className="min-w-20 max-w-28">
        <img src={product.thumbnail} className="h-full w-full rounded-l-lg" alt={`imagen miniatura de ${product.name}`} />
      </header>
      <main className="flex flex-col justify-center items-center gap-0.5 max-w-52 flex-1">
        <h4 className="text-center font-bold w-[16ch] md:w-[40ch] "> {product.name} </h4>
        <div className="flex flex-row-reverse gap-2">
          <Button onClick={() => moreProd(1, product.id)} size="small" className="px-[0.3px] py-[0.3px] "> + </Button>
          <span> {product.numberProd} </span>
          <Button onClick={() => lowerProd(1, product.id)} size="small" className="px-[0.3px] py-[0.3px]"> - </Button>
        </div>
        <span> ${product.price} c/u </span>
      </main>
      <Button onClick={() => removeProduct(product.id)} size="small" className="p-0.5 flex flex-col justify-center items-center hover:bg-primaryRed hover:border-white hover:text-white">
        <IconX />
      </Button>
    </article>
  )
}