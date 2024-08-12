import { HTMLAttributes } from "react"
import { SearchIcon } from "./ui/icons/SearchIcon"
import { ExpandedLogo } from "./ui/ExpandedLogo"
import { useNavigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { CartIcon } from "./ui/icons/CartIcon"
import { useUserSesion } from "@/zustand/UserStorage"
import { Button } from "./ui/Button"
import { IconUserFilled } from "@tabler/icons-react"
import { Avatar } from "./Avatar"
import { useCartStorage } from "@/zustand/CartStorage"

interface Props extends HTMLAttributes<HTMLElement> { }

export const SearchBar: React.FC<Props> = () => {
  const navegate = useNavigate()
  const User = useUserSesion()
  const cartStorage = useCartStorage()
  const handleClickLogo = (URL: string) => {
    navegate(URL)
  }
  return (
    <div className="w-full flex flex-row justify-between items-center px-0 md:px-10">
      <ExpandedLogo onClick={() => handleClickLogo(PUBLIC_ROUTES.HOME)} FillColor="#5A0001" Title="Fake Rubik Store" height="50" width="50" className="md:flex flex-col-reverse justify-center items-center text-xl text-center text-pretty cursor-pointer text-primaryRed hidden" />
      <nav className="max-w-full h-10 px-5 flex flex-row text-black flex-grow">
        <input className="w-full outline-none rounded-l-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 border-primaryRed border-solid" type="text" placeholder="Buscar productos" />
        <button className="rounded-r-3xl bg-primaryRed px-4 text-zinc-50 hover:bg-tomato">
          <SearchIcon />
        </button>
      </nav>
      <div className="hidden md:flex gap-2 flex-row justify-center items-start text-sm">
        {
          User.activeSesion ? <Avatar nameUser={User.infoUser?.First_Name} /> : <Button onClick={()=> navegate(PUBLIC_ROUTES.LOGIN)} size="extraLarge" className="flex flex-row justify-center items-center gap-2" primary={true}><span>Iniciar Sesion</span><IconUserFilled /></Button>
        }
        <Button onClick={()=> cartStorage.changeViewCart(cartStorage.viewCart)} size="extraLarge" className="flex flex-row justify-center items-center gap-2"><span>Ver carrito</span> <CartIcon /></Button>
      </div>
    </div>
  )
}