import { IconsProps } from "@/types/ComponentsTypes"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  Icon?: React.FC<IconsProps>
}
export const Button: React.FC<Props> = ({title, Icon,  ...props})=>{
  return (
    <button {...props} className={`${props.className}`} >
    <span className="text-sm text-bgLight py-2"> {title} </span>
    {Icon != null ? <Icon className="text-bgLight p-0 m-0 w-8 h-8" />: null }
  </button>
  )
}