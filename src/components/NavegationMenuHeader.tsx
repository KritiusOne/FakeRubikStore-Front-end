import { HTMLAttributes } from "react"
import { SearchIcon } from "./ui/icons/SearchIcon"

interface Props extends HTMLAttributes<HTMLElement> {}

export const NavegationMenuHeader: React.FC<Props> = ()=>{
  return (
    <nav className="w-full h-10 px-10 flex flex-row text-black">
      <input className="w-full border-none outline-none rounded-l-3xl px-4 bg-bgLight focus:bg-white text-balck" type="text" placeholder="Buscar productos"/>
      <button className="rounded-r-3xl bg-primaryRed px-4 text-zinc-50 hover:bg-tomato">
        <SearchIcon />
      </button>
    </nav>
  )
}