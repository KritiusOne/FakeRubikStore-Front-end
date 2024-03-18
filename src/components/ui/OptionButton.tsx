import { OptionButtonProps } from "@/types/ComponentsTypes";


export const OptionButton: React.FC<OptionButtonProps> = ({title, Icon,...props})=>{
  return (
    <button {...props} className={`flex text-center text-md text-primaryRed gap-4 py-2 px-4 hover:bg-primaryRed hover:text-bgLight ${props.className}`} >
      <Icon />
      <span> {title} </span>
    </button>
  )
}