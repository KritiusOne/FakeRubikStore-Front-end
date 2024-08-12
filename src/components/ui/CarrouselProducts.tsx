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
  const [numCards, setNumCards] = useState(window.innerWidth <= 600 ? 2 : window.innerWidth <= 1024 ? 3 : 4)
  const [arrCards, setArrCards] = useState<Product[]>([])
  //const [animation, setAnimation] = useState("")


  const updateArrCards = (newIndex: number, numCardsToShow: number) => {
    const totalProducts = productsCarousel.length;
    if (newIndex + numCardsToShow > totalProducts) {
      const copy = [...productsCarousel];
      const aux = copy.slice(newIndex);
      let faltantes = newIndex + numCardsToShow - totalProducts;
      let parcialIndex = 0;
      while (faltantes > 0) {
        aux.push(copy[parcialIndex]);
        faltantes--;
        parcialIndex++;
      }
      setArrCards(aux);
    } else {
      setArrCards(productsCarousel.slice(newIndex, newIndex + numCardsToShow));
    }
  };
  const next = () => {
    const newIndex = (currentIndex + 1) % productsCarousel.length;
    setCurrentIndex(newIndex);
    updateArrCards(newIndex, numCards);
  }
  const previous = () => {
    const totalProducts = productsCarousel.length;
    const newIndex = currentIndex - 1 < 0 ? totalProducts - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    updateArrCards(newIndex, numCards);    
  }
  if (currentIndex > 9) {
    setCurrentIndex(0)
  }
  useEffect(()=>{
    const handleResize = () => {
      const newNumCards = window.innerWidth <= 600 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
      setNumCards(newNumCards);
      updateArrCards(currentIndex, newNumCards)
    };
  
    window.addEventListener('resize', handleResize);
  
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex, productsCarousel])
  return (
    <div className="flex flex-row items-center justify-between px-5 max-w-full">
      <Button border={false} onClick={previous}>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none" >
          <IconArrowLeft className="text-white"/>
        </span>
      </Button>
      <div {...props} className="flex flex-col relative w-full overflow-hidden">
        <div className={`flex flex-row justify-center items-center gap-3 overflow-hidden duration-1000 ease-in-out`}>
          {
            currentIndex == 0 ? productsCarousel.slice(currentIndex, currentIndex + numCards).map(product => <CardProduct productId={product.id} key={product.id} title={product.name} price={product.price} thumbnail={product.thumbnail} /> )
              :
              arrCards.map(product => <CardProduct productId={product.id} key={product.id} title={product.name} price={product.price} thumbnail={product.thumbnail} />)
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