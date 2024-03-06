import { IconsProps } from "@/types/ComponentsTypes";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  title: string
  Icon: React.FC<IconsProps> 
}
export const OptionButton: React.FC<Props> = ({title, Icon,...props})=>{
  return (
    <button {...props} className={`w-full flex text-center text-md text-primaryRed ${props.className} gap-4 py-2 px-4 hover:bg-primaryRed hover:text-bgLight`} >
      <Icon />
      <span> {title} </span>
    </button>
  )
}