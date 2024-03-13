import { HTMLAttributes, useState } from "react"
import { CardProduct } from "./CardProduct"
import { useProductStorage } from "@/zustand/ProductStorage"

interface CarrouselProductsProps extends HTMLAttributes<HTMLElement> {

}
export const CarrouselProducts: React.FC<CarrouselProductsProps> = ({ ...props }) => {
  const productsCarousel = useProductStorage(state => state.BestProducts)
  const [indexSelected, setIndexSelected] = useState<number[]>([0, 1, 2, 3, 4])
  const next = () => {
    const condition = productsCarousel.length > indexSelected[4] + 1
    if (condition){
      const newState = indexSelected.slice(1, indexSelected.length)
      newState.push(indexSelected[4] + 1)
      setIndexSelected(newState)
    }else{
      const newState = indexSelected.slice(1, indexSelected.length)
      newState.push(0)
      setIndexSelected(newState)
    }
  }
  const previous = () => {
    const condition = indexSelected[0] == 0 
    if (condition){
      const newState = indexSelected.slice(0, indexSelected.length - 1)
      newState.push(10)
      console.log(newState)
      setIndexSelected(newState)
    }else{
      const newState = indexSelected.slice(0, indexSelected.length - 1)
      newState.push(indexSelected[0] - 1)
      setIndexSelected(newState)
    }
  }
  return (
    <div className="flex flex-row items-center justify-between">
      <button type="button" className="z-30 flex items-center justify-center px-4  cursor-pointer group focus:outline-none" data-carousel-prev onClick={previous}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <div {...props} className="flex flex-col relative w-full">
        <div className="flex flex-row justify-center items-center gap-3">
          {
            productsCarousel.map((product, i) => !indexSelected.includes(i) ? <CardProduct title={product.name} categories={"NO"} originalPrice={product.price} price={product.price} priceOff={0} thumbnail={product.thumbnail} key={product.id} className="text-primaryRed" /> : null)
          }
        </div>

      </div>
      <button type="button" className="z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={next}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}