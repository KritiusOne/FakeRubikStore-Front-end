import { HTMLAttributes } from "react"
import { AsideMenu } from "./AsideMenu"
import { NavegationMenuHeader } from "./NavegationMenuHeader"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[]
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{
  return (
    <div className="bg-bgDark text-white min-w-screen min-h-screen
    grid grid-cols-12 grid-rows-layout font-oswald" {...otherProps}>
      <div className="col-start-1 col-end-4 row-span-full relative z-10">
        <AsideMenu className="h-screen fixed w-full max-w-[calc(100vw/12*3)] left-0 bg-bgLight" />
      </div>
      <main className="col-start-4 col-end-13 row-start-1 row-end-3 flex flex-col justify-center items-center z-20">
        <NavegationMenuHeader />
        <section>
          {
            children
          }
        </section>
      </main>
      <footer className="bg-primaryRed col-start-1 col-end-13 row-start-3 row-end-4 z-30">
        ESTE ES EL FOOTER
      </footer>
    </div>
  )
}