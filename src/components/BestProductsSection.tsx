import { CarrouselProducts } from "./ui/CarrouselProducts"

export const BestProductsSection: React.FC = ()=>{
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-10/12 md:w-11/12">
      <h2 className="text-bgLight text-2xl md:text-4xl">Productos mas destacados</h2>
      <CarrouselProducts />
    </div>
  )
}