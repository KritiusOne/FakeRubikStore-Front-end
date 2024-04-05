import { HTMLAttributes, useState } from "react"
import { CardProduct } from "./CardProduct"
import { useProductStorage } from "@/zustand/ProductStorage"
import { Product } from "@/types/ProductsTypes"

interface CarrouselProductsProps extends HTMLAttributes<HTMLElement> {

}
export const CarrouselProducts: React.FC<CarrouselProductsProps> = ({ ...props }) => {
  const productsCarousel = useProductStorage(state => state.BestProducts)
  const [indexSelected, setIndexSelected] = useState<number[]>(window.innerWidth >= 950 ?[0, 1, 2, 3] : window.innerWidth < 950 && window.innerWidth > 600 ? [0, 1, 2] : [0])
  const [ProductSelected, setProductSelected] = useState<Product[]>(productsCarousel.slice(0, indexSelected[indexSelected.length - 1] + 1))
  const [animation, setAnimation] = useState("")
  const next = () => {
    const condition = productsCarousel.length > indexSelected[indexSelected.length - 1] + 1
    if (condition){
      const newState = [...indexSelected]
      newState.shift()
      newState.push(indexSelected[indexSelected.length - 1] + 1)
      const newSelectedProducts: Product[] = []
      for (const key of newState) {
        newSelectedProducts.push(productsCarousel[key])
      }
      setIndexSelected(newState)
      setProductSelected(newSelectedProducts)
    }else{
      const newState = indexSelected.slice(1, indexSelected.length)
      newState.push(0)
      const newSelectedProducts: Product[] = []
      for (const key of newState) {
        newSelectedProducts.push(productsCarousel[key])
      }
      setIndexSelected(newState)
      setProductSelected(newSelectedProducts)
    }
    setAnimation('right');

  }
  const previous = () => {
    const condition = indexSelected[0] == 0 
    if (condition){
      const newState = [...indexSelected]
      newState.pop()
      newState.unshift(9)
      const newSelectedProducts:Product[] = []
      for (const key of newState) {
        newSelectedProducts.push(productsCarousel[key])
      }
      setIndexSelected(newState)
      setProductSelected(newSelectedProducts)
    }else{
      const newState = [...indexSelected]
      newState.pop()
      newState.unshift(indexSelected[0] - 1)
      const newSelectedProducts:Product[] = []
      for (const key of newState) {
        newSelectedProducts.push(productsCarousel[key])
      }
      setIndexSelected(newState)
      setProductSelected(newSelectedProducts)
    }
    setAnimation('left');
  }
  return (
    <div className="flex flex-row items-center justify-between px-5 max-w-full">
      <button type="button" className="z-30 flex items-center justify-center px-4  cursor-pointer group focus:outline-none" data-carousel-prev onClick={previous}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <div {...props} className="flex flex-col relative w-full overflow-hidden">
        <div className={`flex flex-row justify-center items-center gap-3 overflow-hidden`}>
        {
            ProductSelected.length != 0 ? ProductSelected.map((product, i) => <CardProduct key={i} title={product.name} price={product.price} thumbnail={product.thumbnail} 
            description={product.description} image={product.image} 
            stock={product.stock} className={`text-primaryRed ${animation == 'right' ? 'slide-in-right' : animation == 'left' ? 'slide-in-left' : ''}`} />) 
            : 
            productsCarousel.map((product, i) => indexSelected.includes(i) ?
            <CardProduct key={i} title={product.name} price={product.price} thumbnail={product.thumbnail} 
            description={product.description} image={product.image} 
            stock={product.stock} className={`text-primaryRed `} /> : null)
          }
        </div>

      </div>
      <button type="button" className="z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={next}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  )
}