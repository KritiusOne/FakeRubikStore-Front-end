import { CarrouselProps } from "@/types/ComponentsTypes"
import { CarrouselItem } from "./CarrouselItem"

export const Carrousel: React.FC<CarrouselProps> = ({imgCarrousel,next, previous, ...props}) => {
  return (
    <div className="flex flex-row justify-center  md:w-full px-6 items-center">
    <button type="button" className="z-30 flex items-center justify-center px-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev onClick={previous}>
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
      <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 1 1 5l4 4" />
      </svg>
      <span className="sr-only">Previous</span>
    </span>
  </button>
    <div id="default-carousel" data-carousel="slide"
    {...props} className={`relative w-full ${props.className}`} >
      <div className="flex justify-center items-center relative h-56 overflow-hidden rounded-lg md:h-96">
        {/* Carrousel img, cada div contiene las img*/}
        <CarrouselItem img={imgCarrousel} />
      </div>

    </div>
      <button type="button" className="flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next onClick={next}>
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