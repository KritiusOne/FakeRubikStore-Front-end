import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {}

export const NavegationMenuHeader: React.FC<Props> = ()=>{
  return (
    <nav className="flex flex-row justify-center items-center">
      <input type="text" />
      <button></button>
    </nav>
  )
}