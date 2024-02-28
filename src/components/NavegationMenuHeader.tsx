import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  url: string
}
export const NavegationMenuHeader: React.FC<Props> = ({url})=>{
  return (
    <nav className="w-screen flex flex-row justify-around">
      <ul>
        <li>Boton 1</li>
        <li>Boton 2</li>
        <li>Boton 3</li>
      </ul>
      <h2>
        {url}
      </h2>
      <ul>
        <li>Iniciar sesion</li>
        <li> Carrito </li>
      </ul>
    </nav>
  )
}