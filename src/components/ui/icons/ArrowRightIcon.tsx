import { IconsProps } from "@/types/ComponentsTypes";

export const ArrowRightIcon: React.FC<IconsProps> = ({...props})=>{
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
  )
}