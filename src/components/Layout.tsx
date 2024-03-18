import { HTMLAttributes} from "react"
import { AsideMenu } from "./AsideMenu"
import { SearchBar } from "./SearchBar"
import { Footer } from "./Footer"
import { Link } from "react-router-dom"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { OptionButton } from "./ui/OptionButton"
import { CartIcon } from "./ui/icons/CartIcon"
import { FilterIcon } from "./ui/icons/FilterIcon"
import { HistoryIcon } from "./ui/icons/HistoryIcon"
import { UserIcon } from "./ui/icons/UserIcon"
import { WCAIcon } from "./ui/icons/WCAIcon"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{

  return (
    <div className="bg-bgDark min-w-screen min-h-screen
    flex flex-col justify-center items-start font-oswald" {...otherProps}>
      <header className="w-full bg-bgLight sticky top-0 z-30">
        <SearchBar />
        <ul className="flex flex-row justify-center items-center">
          <li>
            <OptionButton title="WCA" Icon={WCAIcon} />
          </li>
          <li>
            <OptionButton title="Busqueda avanzada" Icon={FilterIcon} />
          </li>
          <li>
            <OptionButton title="Historial de compras" Icon={HistoryIcon} />
          </li>
        </ul>
      </header>
      <main className="flex flex-col justify-between items-center z-20 py-7">
          {
            children
          }
      </main>
      <div className="w-full z-30" >
        <Footer className="w-full h-full"/>
      </div>
    </div>
  )
}