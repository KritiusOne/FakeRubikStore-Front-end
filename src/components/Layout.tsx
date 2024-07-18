import { HTMLAttributes, useEffect} from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import "./layout.css"
import { useUserSesion } from "@/zustand/UserStorage"
import { useCartStorage } from "@/zustand/CartStorage"
import { CartMenu } from "./CartMenu"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{
  const HaveToken = useUserSesion(Storage => Storage.haveSesion)
  const viewCart = useCartStorage(Storage => Storage.viewCart)
  useEffect(()=>{
    HaveToken()
  }, [])
  return (
    <div {...otherProps} className={`layout bg-bgDark min-w-screen min-h-screen
    flex flex-col justify-center items-start font-oswald ${otherProps.className}`} >
      <Header className="header" />
      <main className="main flex flex-col justify-between items-center z-20">
          {
            children
          }
      </main>
          {
            viewCart && <CartMenu />
          }
      <div className="footer w-full z-30" >
        <Footer className="w-full h-full"/>
      </div>
    </div>
  )
}