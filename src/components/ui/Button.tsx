import { IconsProps } from "@/types/ComponentsTypes"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  Icon?: React.FC<IconsProps>
}
export const Button: React.FC<Props> = ({title, Icon,  ...props})=>{
  return (
    <button {...props} className={`max-w-20 flex text-center text-md rounded-md px-3 bg-primaryRed justify-center items-center ${props.className}`} >
    <span className="text-sm text-bgLight"> {title} </span>
    {Icon != null ? <Icon className="text-bgLight p-0 m-0 w-8 h-8" />: null }
  </button>
  )
}