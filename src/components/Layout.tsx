import { HTMLAttributes } from "react"
import { AsideMenu } from "./AsideMenu"
import { NavegationMenuHeader } from "./NavegationMenuHeader"
import { Footer } from "./Footer"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{
  return (
    <div className="bg-bgDark  min-w-screen min-h-screen
    grid grid-cols-12 grid-rows-layout font-oswald" {...otherProps}>
      <div className="col-start-1 col-end-4 row-span-full relative z-10">
        <AsideMenu className="h-screen fixed w-full max-w-[calc(100vw/12*3)] left-0 bg-bgLight" />
      </div>
      <main className="col-start-4 col-end-13 row-start-1 row-end-3 flex flex-col justify-between items-center z-20 py-7">
        <NavegationMenuHeader />
          {
            children
          }
      </main>
      <Footer className="col-start-1 col-end-13 row-start-3 row-end-4 z-30" />
    </div>
  )
}