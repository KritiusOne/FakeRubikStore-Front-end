import React, { HTMLAttributes } from "react";
import { HMenu } from "./ui/icons/HMenu";
import { SearchBar } from "./SearchBar";
import { WCAIcon } from "./ui/icons/WCAIcon";
import { Button } from "./ui/Button";
import { IconFilterFilled, IconLogout } from '@tabler/icons-react';
import { IconHistory } from '@tabler/icons-react';
import { useUserSesion } from "@/zustand/UserStorage";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes";

interface Props extends HTMLAttributes<HTMLElement>{}
export const Header: React.FC<Props> = ({...props})=> {
  const activeSesion = useUserSesion(Storage => Storage.activeSesion)
  const logOut = useUserSesion(Storage => Storage.logOut)
  const navegate = useNavigate()
  return (
    <header {...props} className={`w-full bg-bgLight sticky top-0 z-30 flex flex-row justify-between items-center py-3 px-4 md:flex-col md:justify-center overflow-hidden ${props.className}`}>
        <HMenu className="block md:hidden cursor-pointer text-primaryRed" />
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
            <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"><span>Historial de compras</span> <IconHistory /> </Button>
          </li>
          }
          {
            activeSesion && <li>
            <Button size="extraLarge" className="flex flex-row gap-2 text-primaryRed border-primaryRed hover:bg-bgDark hover:text-white hover:border-bgDark"
            onClick={()=>{
              logOut()
              navegate(PUBLIC_ROUTES.HOME)
            }}><span>Cerrar sesión</span> <IconLogout /> </Button>
          </li>
          }
        </ul>
      </header>
      
  )
}