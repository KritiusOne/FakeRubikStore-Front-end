import { HTMLAttributes, useEffect, useState } from "react"
import { CardProduct } from "./CardProduct"
import { useProductStorage } from "@/zustand/ProductStorage"
import { Product } from "@/types/ProductsTypes"
import { Button } from "./Button"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

interface CarrouselProductsProps extends HTMLAttributes<HTMLElement> {

}
export const CarrouselProducts: React.FC<CarrouselProductsProps> = ({ ...props }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const productsCarousel = useProductStorage(state => state.BestProducts)
  const [numCards, setNumCards] = useState(window.innerWidth <= 600 ? 2 : window.innerWidth <= 830 ? 3 : 4)
  const [arrCards, setArrCards] = useState<Product[]>([])
  //const [animation, setAnimation] = useState("")
  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % productsCarousel.length);
    if(currentIndex + numCards > 9){
      const copy = [...productsCarousel]
      let faltantes = currentIndex + numCards - 9
      let indice = 0
      console.log(faltantes)
      const aux = copy.slice(currentIndex + 1)
      while(faltantes != 0) {
        aux.push(copy[indice])
        faltantes--
        indice++
      }
      setArrCards(aux)
    }else{
      setArrCards(productsCarousel.slice(currentIndex + 1, currentIndex + numCards + 1))
    }
  }
  const previous = () => {
    if(currentIndex - 1 + numCards > 0){
      const copy = [...productsCarousel]
      const aux = copy.slice(currentIndex - 1)
      //por terminar
    }else{
      setArrCards(productsCarousel.slice(currentIndex - 1, currentIndex + numCards))
      setCurrentIndex(currentIndex - 1)
    }
    
  }
  if (currentIndex > 9) {
    console.log(currentIndex)
    setCurrentIndex(0)
  }
  useEffect(()=>{
    window.addEventListener("resize", ()=> setNumCards(window.innerWidth <= 600 ? 2 : window.innerWidth <= 830 ? 3 : 4) )
  })
  return (
    <div className="flex flex-row items-center justify-between px-5 max-w-full">
      <Button border={false} onClick={previous}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none" >
          <IconArrowLeft className="text-white"/>
        </span>
      </Button>
      <div {...props} className="flex flex-col relative w-full overflow-hidden">
        <div className={`flex flex-row justify-center items-center gap-3 overflow-hidden`}>
          {
            currentIndex == 0 ? productsCarousel.slice(currentIndex, currentIndex + numCards).map(product => <CardProduct productId={product.id} key={product.id} title={product.name} price={product.price} thumbnail={product.thumbnail}
              className={`text-primaryRed `} /> )
              :
              arrCards.map(product => <CardProduct productId={product.id} key={product.id} title={product.name} price={product.price} thumbnail={product.thumbnail}
                className={`text-primaryRed `} />)
          }
        </div>
      </div>
      <Button border={false} onClick={next}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none" >
          <IconArrowRight className="text-white"/>
        </span>
      </Button>
    </div>
  )
}