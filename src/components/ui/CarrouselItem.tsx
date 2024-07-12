import { CarrouselItemProps } from "@/types/ComponentsTypes";
import React from "react";
export const CarrouselItem: React.FC<CarrouselItemProps> = ({img, stylesImg, ...props})=>{
  return (
    <div {...props} className={`duration-700 ease-in-out ${props.className}`} data-carousel-item>
      <img src={img} className={`block max-w-full ${stylesImg}`} alt="Imagen del carrosel" />
    </div>
  )
}