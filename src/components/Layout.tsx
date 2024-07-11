import { HTMLAttributes} from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import "./layout.css"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Layout: React.FC<Props> = ({children, ...otherProps})=>{

  return (
    <div {...otherProps} className={`layout bg-bgDark min-w-screen min-h-screen
    flex flex-col justify-center items-start font-oswald ${otherProps.className}`} >
      <Header className="header" />
      <main className="main flex flex-col justify-between items-center z-20 py-7">
          {
            children
          }
      </main>
      <div className="footer w-full z-30" >
        <Footer className="w-full h-full"/>
      </div>
    </div>
  )
}