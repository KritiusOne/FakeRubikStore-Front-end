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
    <article className="flex flex-row justify-between items-center">
      <header className="max-w-28">
        <img src={product.thumbnail} className="h-full w-full" alt={`imagen miniatura de ${product.name}`} />
      </header>
      <main className="flex flex-col justify-center items-center gap-0.5">
        <h4 className="text-pretty font-bold w-[16ch] "> {product.name} </h4>
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