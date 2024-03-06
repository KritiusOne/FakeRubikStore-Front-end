import { HTMLAttributes } from "react"
import { AsideMenu } from "./AsideMenu"
import { NavegationMenuHeader } from "./NavegationMenuHeader"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[]
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{
  return (
    <div className="bg-bgDark text-white min-w-screen min-h-screen
    grid grid-cols-4 grid-rows-3" {...otherProps}>
      <AsideMenu className="w-full col-span-1 row-span-full bg-bgLight"  />
      <main className="col-start-2 col-end-5 row-start-1 row-end-4 bg-tomato flex flex-col justify-center items-center grid-start-2 grid-end-3">
        <NavegationMenuHeader className="" />
        <section>
          {
            children
          }
        </section>
      </main>
      <footer className="bg-primaryRed col-start-1 col-end-5 row-span-3">
        ESTE ES EL FOOTER
      </footer>
    </div>
  )
}