import { IconsProps } from "@/types/ComponentsTypes";
import { HTMLAttributes } from "react";
import { ArrowRightIcon } from "./ui/icons/ArrowRightIcon";
import { OptionButton } from "./ui/OptionButton";
interface Props extends HTMLAttributes<HTMLElement> {
  title: string
  Icon: React.FC<IconsProps>
  buttonName: string
  handleClick: () => void
}

export const Card: React.FC<Props> = ({title, Icon, buttonName,handleClick, ...props})=>{
  return (
    <article  {...props} className={`bg-bgLight flex flex-col justify-between items-center px-4 py-6 rounded-3xl ${props.className}`}>
      <h2 className="text-2xl font-bold text-pretty"> {title} </h2>
      <Icon className="w-20 h-32 text-primaryRed"/>
      <OptionButton Icon={ArrowRightIcon} title={buttonName} onClick={()=> handleClick()} className="flex flex-row-reverse bg-primaryRed text-white rounded-md"/>
    </article>
  )
}