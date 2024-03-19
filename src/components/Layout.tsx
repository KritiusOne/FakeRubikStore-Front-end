import { HTMLAttributes} from "react"
import { SearchBar } from "./SearchBar"
import { Footer } from "./Footer"
import { OptionButton } from "./ui/OptionButton"
import { FilterIcon } from "./ui/icons/FilterIcon"
import { HistoryIcon } from "./ui/icons/HistoryIcon"
import { WCAIcon } from "./ui/icons/WCAIcon"
import { HMenu } from "./ui/icons/HMenu"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{

  return (
    <div {...otherProps} className={`bg-bgDark min-w-screen min-h-screen
    flex flex-col justify-center items-start font-oswald ${otherProps.className}`} >
      <header className="w-full bg-bgLight sticky top-0 z-30 flex flex-row justify-between items-center py-3 px-4 md:flex-col md:justify-center overflow-hidden">
        <HMenu className="block md:hidden cursor-pointer text-primaryRed" />
        <SearchBar className="w-full" />
        <ul className="md:flex flex-row justify-center items-center hidden">
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