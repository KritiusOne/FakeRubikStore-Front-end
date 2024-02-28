import { HTMLAttributes } from "react"
import { NavegationMenuHeader } from "./NavegationMenuHeader"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[]
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{
  return (
    <div className="min-h-screen min-w-screen bg-slate-950 text-slate-50 flex flex-col mx-auto items-center" {...otherProps}>
      <NavegationMenuHeader url="LOGO" />
      {
        children
      }
    </div>
  )
}