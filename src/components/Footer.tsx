import { HTMLAttributes } from "react"
import { LinkedIn } from "./ui/icons/LinkedIn"
import { Github } from "./ui/icons/Github"
import { Instagram } from "./ui/icons/Instagram"

interface Props extends HTMLAttributes<HTMLElement> { }
export const Footer: React.FC<Props> = ({ ...props }) => {
  return (
    <footer {...props} className={`bg-primaryRed grid grid-cols-1 md:grid-cols-3 grid-rows-1 py-10 ${props.className}`}>
      <ul className={`flex flex-col justify-center items-start gap-2 px-10 text-bgLight`} >
        <h4 className="font-oswald font-bold text-xl">
          Resource
        </h4>
        <li>Documentación API</li>
        <li>Blog</li>
        <li>
          <a target="_blank" href="https://github.com/KritiusOne/FakeRubikStore-Front-end" className="">
            Repositorio del proyecto
          </a>
        </li>
      </ul>
      <ul className={`flex flex-col justify-center items-start gap-2 px-10 text-bgLight`} >
        <h4 className="font-oswald font-bold text-xl">
          Info
        </h4>
        <li>About Us</li>
        <li>Portafolio</li>
      </ul>
      <ul className={`flex flex-col justify-center items-start gap-2 px-10 text-bgLight`} >
        <h4 className="font-oswald font-bold text-xl">
          Follow me
        </h4>
        <li className="flex flex-row gap-4">
          <a target="_blank" href="https://www.linkedin.com/in/juliorodriguezureche--/" >
            <LinkedIn className="w-8 h-8" />
          </a>
          <a target="_blank" href="https://github.com/KritiusOne" >
            <Github className="w-8 h-8" />
          </a>
          <a target="_blank" href="https://www.instagram.com/rour10/" >
            <Instagram className="w-8 h-8" />
          </a>
        </li>
      </ul>
    </footer>
  )
}