import { HTMLAttributes } from "react"
import { ExpandedLogo } from "./ui/ExpandedLogo"
import { OptionButton } from "./ui/OptionButton"
import { ConfigIcon } from "./ui/icons/ConfigIcon"
import { CartIcon } from "./ui/icons/CartIcon"
import { UserIcon } from "./ui/icons/UserIcon"
import { ForYouIcon } from "./ui/icons/ForYouIcon"
import { ButtonCollection } from "./ui/ButtonCollection"
import { HistoryIcon } from "./ui/icons/HistoryIcon"
import { FilterIcon } from "./ui/icons/FilterIcon"
import { WCAIcon } from "./ui/icons/WCAIcon"
import { DeliveryIcon } from "./ui/icons/DeliveriesIcon"
import { useNavigate } from "react-router-dom"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"

interface Props extends HTMLAttributes<HTMLElement> {}

export const AsideMenu: React.FC<Props> = ({...props})=>{
  const navegate = useNavigate()
  const navegationOptions = (URL: string)=>{
    navegate(URL)
  }
  //esto va a ser cambiado por el carrtio
  return (
    <aside  {...props} className={`py-4 flex flex-col justify-between items-center ${props.className}`}>
      <ButtonCollection className="w-full flex flex-col justify-center items-start">
        <OptionButton Icon={CartIcon} title="Carrito de compras" />
        <OptionButton onClick={()=> navegationOptions(PUBLIC_ROUTES.LOGIN)} Icon={UserIcon} title="Iniciar Sesión" />
        <OptionButton Icon={CartIcon} title="Promociones" />
        <OptionButton Icon={ForYouIcon} title="Recomendados para ti" />
      </ButtonCollection>
      <ButtonCollection>
        <OptionButton title="Historial de compras" Icon={HistoryIcon} />
        <OptionButton title="Busqueda avanzada" Icon={FilterIcon} />
        <OptionButton title="WCA" Icon={WCAIcon} />
        <OptionButton title="Pedidos activos" Icon={DeliveryIcon} />
      </ButtonCollection>
      <ButtonCollection>
        <OptionButton title="Configuración" Icon={ConfigIcon} />
        <OptionButton title="About Us" Icon={ConfigIcon} />
      </ButtonCollection>
    </aside>
  )
}