import { IconsProps } from "@/types/ComponentsTypes"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLAnchorElement>{
  linkTo: string
  Icon: React.FC<IconsProps>
}
export const ExternalLink: React.FC<Props> = ({linkTo, Icon, children, ...props})=>{
  return (
    <a target="_blank" href={linkTo} {...props}>
      <Icon className="w-8 h-8" />
      {
        children
      }
    </a>
  )
}