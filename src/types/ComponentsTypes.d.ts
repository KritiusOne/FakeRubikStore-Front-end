import { HTMLAttributes } from "react"

export interface IconsProps{
  className?: string
}
interface OptionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  title: string
  Icon: React.FC<IconsProps> 
}

interface CarrouselProps extends HTMLAttributes<HTMLElement>{
  imgCarrousel: string
  previous: () => void
  next: ()=> void
}
interface CarrouselItemProps extends HTMLAttributes<HTMLElement>{
  img: string
  stylesImg?: string
}