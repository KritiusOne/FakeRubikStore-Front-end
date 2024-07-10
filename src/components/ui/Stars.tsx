import { HTMLAttributes } from "react"
import { IconStarFilled } from '@tabler/icons-react';

interface Props extends HTMLAttributes<HTMLElement>{
  numStars: number
  size?: "small" | "medium" | "large"
}

export const Stars: React.FC<Props> = ({numStars, size = "medium", ...props})=>{
  return (
    <div {...props} className={`flex flex-row justify-center items-center gap-2${props.className}`}>
      {
        Array.from(Array(5), (_, i)=> <IconStarFilled key={i} className={`${i < numStars ? "text-yellow-300" : "text-gray-800"}`} height={size == "small" ? 16 : size == "large" ? 48 : 32} /> )
      }
    </div>
  )
}