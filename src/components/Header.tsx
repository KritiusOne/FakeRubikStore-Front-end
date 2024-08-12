import React, { HTMLAttributes, useState } from "react";
import { HMenu } from "./ui/icons/HMenu";
import { SearchBar } from "./SearchBar";
import { WCAIcon } from "./ui/icons/WCAIcon";
import { Button } from "./ui/Button";
import { IconShoppingCart, IconFilterFilled, IconLogout, IconUserFilled } from '@tabler/icons-react';
import { IconHistory } from '@tabler/icons-react';
import { useUserSesion } from "@/zustand/UserStorage";
import { useNavigate } from "react-router-dom";
import { PRIVATE_USER_ROUTES, PUBLIC_ROUTES } from "@/routes/TypesRoutes";
import { Dialog } from "./ui/Dialog";
import { Logo } from "./ui/Logo";
import { Avatar } from "./Avatar";
import { useCartStorage } from "@/zustand/CartStorage";
interface Props extends HTMLAttributes<HTMLElement> { }

export const Header: React.FC<Props> = ({ ...props }) => {
  const activeSesion = useUserSesion(Storage => Storage.activeSesion)
  const UserInfo = useUserSesion(Storage => Storage.infoUser)
  const logOut = useUserSesion(Storage => Storage.logOut)
  const navegate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const cartStorage = useCartStorage()

  return (
    <>
      <header {...props} className={`w-full bg-bgLight sticky top-0 z-30 flex flex-row justify-between items-center py-3 px-4 md:flex-col md:justify-center overflow-hidden ${props.className}`}>
        <button onClick={() => setShowMenu(true)} className="bg-transparent border-none outline-none">
          <HMenu className="block md:hidden cursor-pointer text-primaryRed" />
        </button>
        <SearchBar className="w-full" />
        <ul className="md:flex flex-row justify-center items-center gap-4 hidden">
          <li>
            <Button size="medium" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"> <span>WCA</span> <WCAIcon className="text-xl" /></Button>
          </li>
          <li>
            <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"> <span>Busqueda avanzada</span> <IconFilterFilled /> </Button>
          </li>
          {
            activeSesion && <li>
              <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                onClick={() => navegate(PRIVATE_USER_ROUTES.SHOPPING_HISTORY)}><span>Historial de compras</span> <IconHistory /> </Button>
            </li>
          }
          {
            activeSesion && <li>
              <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                onClick={() => {
                  logOut()
                  navegate(PUBLIC_ROUTES.HOME)
                }}><span>Cerrar sesión</span> <IconLogout /> </Button>
            </li>
          }
        </ul>
      </header>
      {
        showMenu && (
          <Dialog onClose={() => setShowMenu(false)}>
            <ul className="w-full h-full bg-bgLight flex flex-col px-4 py-3 items-start justify-center gap-2 rounded-md">
              <li className="cursor-pointer " onClick={() => navegate(PUBLIC_ROUTES.HOME)}>
                <Logo FillColor={"#5a0001"} height={"150"} width={"150"} />
              </li>
              <li>
                {
                  activeSesion ? <Avatar nameUser={UserInfo?.First_Name} /> : <Button onClick={() => navegate(PUBLIC_ROUTES.LOGIN)} size="extraLarge" className="flex flex-row justify-center items-center gap-2" primary={true}><span>Iniciar Sesion</span><IconUserFilled /></Button>
                }
              </li>
              <li>
                <Button
                  onClick={() => {
                    cartStorage.changeViewCart(cartStorage.viewCart)
                    setShowMenu(false)
                  }}
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
                activeSesion && <li>
                  <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                    onClick={() => navegate(PRIVATE_USER_ROUTES.SHOPPING_HISTORY)}><span>Historial de compras</span> <IconHistory /> </Button>
                </li>
              }
              {
                activeSesion && <li>
                  <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                    onClick={() => {
                      logOut()
                      navegate(PUBLIC_ROUTES.HOME)
                    }}><span>Cerrar sesión</span> <IconLogout /> </Button>
                </li>
              }

            </ul>
          </Dialog>
        )
      }
    </>

  )
}