import { HTMLAttributes } from "react"
import { SearchIcon } from "./ui/icons/SearchIcon"
import { ExpandedLogo } from "./ui/ExpandedLogo"
import { Link, useNavigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { UserIcon } from "./ui/icons/UserIcon"
import { CartIcon } from "./ui/icons/CartIcon"
import { OptionButton } from "./ui/OptionButton"
import { ButtonCollection } from "./ui/ButtonCollection"

interface Props extends HTMLAttributes<HTMLElement> {}

export const SearchBar: React.FC<Props> = ()=>{
  const navegate = useNavigate()
  const handleClickLogo = (URL: string)=>{
    navegate(URL)
  }
  return (
    <div className="w-full flex flex-row justify-between items-center px-0 md:px-10">
      <ExpandedLogo onClick={()=>handleClickLogo(PUBLIC_ROUTES.HOME)} FillColor="#5A0001" Title="Fake Rubik Store" height="50" width="50" className="md:flex flex-col-reverse justify-center items-center text-xl text-center text-pretty cursor-pointer text-primaryRed hidden" />
      <nav className="w-full h-10 px-10 flex flex-row text-black flex-grow">
        <input className="w-full outline-none rounded-l-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 border-primaryRed border-solid" type="text" placeholder="Buscar productos"/>
        <button className="rounded-r-3xl bg-primaryRed px-4 text-zinc-50 hover:bg-tomato">
          <SearchIcon />
        </button>
      </nav>
      <ButtonCollection className="hidden md:flex flex-row text-sm">
        <Link className="text-bgLight bg-primaryRed px-4 py-2 rounded-lg flex flex-row gap-2 hover:bg-bgLight hover:text-primaryRed border-2 border-primaryRed" to={PUBLIC_ROUTES.LOGIN}> <UserIcon /> Iniciar sesión  </Link>
        <OptionButton Icon={CartIcon} title="Ver Carrito" className="rounded-lg" />
      </ButtonCollection>
    </div>
  )
}