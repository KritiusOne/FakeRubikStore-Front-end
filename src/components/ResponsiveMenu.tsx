import { HTMLAttributes } from "react"
import { WCAIcon } from "./ui/icons/WCAIcon"
import { useNavigate } from "react-router-dom"
import { PRIVATE_USER_ROUTES, PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { Logo } from "./ui/Logo"
import { Avatar } from "./Avatar"
import { useUserSesion } from "@/zustand/UserStorage"
import { Button } from "./ui/Button"
import { IconFilterFilled, IconHistory, IconLogout, IconShoppingCart, IconUserFilled } from "@tabler/icons-react"

interface Props extends HTMLAttributes<HTMLElement> { 
  handleClickCart: ()=> void
}

export const ResponsiveMenu: React.FC<Props> = ({handleClickCart}) => {
  const navegate = useNavigate()
  const UserSesion = useUserSesion()
  return (
    <ul className="w-full h-full bg-bgLight flex flex-col px-4 py-3 items-start justify-center gap-2 rounded-md">
      <li className="cursor-pointer " onClick={() => navegate(PUBLIC_ROUTES.HOME)}>
        <Logo FillColor={"#5a0001"} height={"150"} width={"150"} />
      </li>
      <li>
        {
          UserSesion.activeSesion ? <Avatar nameUser={UserSesion.infoUser?.First_Name} /> : <Button onClick={() => navegate(PUBLIC_ROUTES.LOGIN)} size="extraLarge" className="flex flex-row justify-center items-center gap-2" primary={true}><span>Iniciar Sesion</span><IconUserFilled /></Button>
        }
      </li>
      <li>
        <Button
          onClick={() => handleClickCart()}
          size="extraLarge"
          className="flex flex-row justify-center items-center gap-2">
          <span>Ver carrito</span> <IconShoppingCart />
        </Button>
      </li>
      <li>
        <Button size="medium" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"> <span>WCA</span> <WCAIcon className="text-xl" /></Button>
      </li>
      <li>
        <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"> <span>Busqueda avanzada</span> <IconFilterFilled /> </Button>
      </li>
      {
        UserSesion.activeSesion && <li>
          <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
            onClick={() => navegate(PRIVATE_USER_ROUTES.SHOPPING_HISTORY)}><span>Historial de compras</span> <IconHistory /> </Button>
        </li>
      }
      {
        UserSesion.activeSesion && <li>
          <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
            onClick={() => {
              UserSesion.logOut()
              navegate(PUBLIC_ROUTES.HOME)
            }}><span>Cerrar sesión</span> <IconLogout /> </Button>
        </li>
      }

    </ul>
  )
}