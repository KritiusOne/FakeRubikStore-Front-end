import { CarrouselItemProps } from "@/types/ComponentsTypes";
import React from "react";
export const CarrouselItem: React.FC<CarrouselItemProps> = ({img, stylesImg, ...props})=>{
  return (
    <div {...props} className={`duration-700 ease-in-out ${props.className}`} data-carousel-item>
      <img src={img} className={`absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 duration-700 ease-in-out ${stylesImg}`} alt="Imagen del carrosel" />
    </div>
  )
}