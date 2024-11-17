import React, { HTMLAttributes, useEffect, useState } from "react";
import { HMenu } from "./ui/icons/HMenu";
import { SearchBar } from "./SearchBar";
import { WCAIcon } from "./ui/icons/WCAIcon";
import { Button } from "./ui/Button";
import { IconLogout, IconMoneybag } from '@tabler/icons-react';
import { IconHistory } from '@tabler/icons-react';
import { useUserSesion } from "@/zustand/UserStorage";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ADMIN_ROUTES, PRIVATE_SELLER_ROUTES, PRIVATE_USER_ROUTES, PUBLIC_ROUTES } from "@/routes/TypesRoutes";
import { Dialog } from "./ui/Dialog";
import { useCartStorage } from "@/zustand/CartStorage";
import { ResponsiveMenu } from "./ResponsiveMenu"
import { FiltersProductsNames, formatURLtoNavParams } from "@/lib/SearchLibrary";
import { useProductStorage } from "@/zustand/ProductStorage";
interface Props extends HTMLAttributes<HTMLElement> { }

export const Header: React.FC<Props> = ({ ...props }) => {
  const UserSesion = useUserSesion()
  const navegate = useNavigate()
  const cartStorage = useCartStorage()
  const [showMenu, setShowMenu] = useState(false)
  const [role, setRole] = useState("2")
  const { setVoidTags } = useProductStorage()
  useEffect(() => {
    if (UserSesion.infoUser) {
      setRole(UserSesion.infoUser.IdRole)
    } else {
      setRole("2")
    }
  }, [UserSesion.activeSesion])
  const handleSearchWCAProduct = () => {
    const params = new URLSearchParams()
    params.set(FiltersProductsNames.PageSize, "10")
    params.set(FiltersProductsNames.PageNumber, "1")
    params.set(FiltersProductsNames.CategoriesIds, "3")
    const URL2Nav = formatURLtoNavParams(params, PUBLIC_ROUTES.SEARCH_PRODUCT)
    setVoidTags()
    navegate(URL2Nav)
  }
  return (
    <>
      <header {...props} className={`w-full bg-bgLight sticky top-0 z-30 flex flex-row justify-between items-center py-3 px-4 md:flex-col md:justify-center overflow-hidden ${props.className}`}>
        <button onClick={() => setShowMenu(true)} className="block md:hidden  bg-transparent border-none outline-none">
          <HMenu className="cursor-pointer text-primaryRed" />
        </button>
        <SearchBar className="w-full" />
        <ul className="md:flex flex-row justify-center items-center gap-4 hidden">
          <li>
            {
              UserSesion.infoUser != null && role != "2" && <Button size="extraLarge"
                className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                onClick={() => navegate(PRIVATE_SELLER_ROUTES.SELL_ORDERS)}> <span>Ver pedidos</span> <IconMoneybag /> </Button>
            }
            {
              role == "2" && <Button
                size="medium"
                className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                onClick={() => handleSearchWCAProduct()}> <span>WCA</span> <WCAIcon className="text-xl" /></Button>
            }
          </li>
          {
            UserSesion.infoUser != null && role == "1" && (
              <li>
                <Button size="extraLarge"
                  className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
                  onClick={() => navegate(PRIVATE_ADMIN_ROUTES.CONTROL_PANEL)}> <span> Panel de control </span> <WCAIcon /> </Button>
              </li>
            )
          }
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
      </header>
      {
        showMenu && (
          <Dialog onClose={() => setShowMenu(false)}>
            <ResponsiveMenu handleClose={() => setShowMenu(false)} handleClickCart={() => {
              cartStorage.changeViewCart(cartStorage.viewCart)
              setShowMenu(false)
            }} />
          </Dialog>
        )
      }
    </>

  )
}