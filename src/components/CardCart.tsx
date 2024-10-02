import { IconX } from "@tabler/icons-react";
import React from "react";
import { Button } from "./ui/Button";
import { useCartStorage } from "@/zustand/CartStorage";
import { RouteImage } from "@/lib/CreateRouteImage";


interface Props {
  img: string
  title: string
  cantidad: number
  price: number
  id: number
}
export const CardCart: React.FC<Props> = ({ id, img, title, cantidad, price }) => {
  const moreProd = useCartStorage(Storage => Storage.plusStock)
  const lowerProd = useCartStorage(Storage => Storage.minusStock)
  const removeProduct = useCartStorage(Storage => Storage.removeProduct)
  return (
    <article className="flex flex-row justify-center items-center gap-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-1">
      <header className="max-w-28">
        <img src={RouteImage(img)} className="h-full w-full" alt={`imagen miniatura de ${title}`} />
      </header>
      <main className="flex flex-col justify-center items-center gap-0.5">
        <h4 className="text-pretty font-bold w-[16ch] "> {title} </h4>
        <div className="flex flex-row-reverse gap-2">
          <Button onClick={() => moreProd(1, id)} size="small" className="px-[0.3px] py-[0.3px] "> + </Button>
          <span> {cantidad} </span>
          <Button onClick={() => lowerProd(1, id)} size="small" className="px-[0.3px] py-[0.3px]"> - </Button>
        </div>
        <span> ${price} c/u </span>
      </main>
      <Button onClick={()=> removeProduct(id)} size="small" className="p-0.5 flex flex-col justify-center items-center hover:bg-primaryRed hover:border-white hover:text-white">
        <IconX />
      </Button>
    </article>
  )
}