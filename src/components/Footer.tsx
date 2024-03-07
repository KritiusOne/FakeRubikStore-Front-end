import { HTMLAttributes } from "react"
import { ListContainer } from "./ui/ListContainer"
import { ExternalLink } from "./ui/ExternalLink"
import { LinkedIn } from "./ui/icons/LinkedIn"
import { Github } from "./ui/icons/Github"
import { Instagram } from "./ui/icons/Instagram"

interface Props extends HTMLAttributes<HTMLElement> { }
export const Footer: React.FC<Props> = ({...props}) => {
  return (
    <footer {...props} className={`bg-primaryRed grid grid-cols-1 md:grid-cols-3 grid-rows-1 py-10 ${props.className}`}>
      <ListContainer title="Resource">
        <li>Documentación API</li>
        <li>Blog</li>
        <li>Repositorio</li>
      </ListContainer>
      <ListContainer title="Info">
          <li>About Us</li>
          <li>Portafolio</li>
          <li>Preguntas y respuestas</li>
      </ListContainer>
      <ListContainer title="Follow me">
          <li className="flex flex-row gap-4">
            <ExternalLink Icon={LinkedIn} linkTo="https://www.linkedin.com/in/juliorodriguezureche--/" />
            <ExternalLink Icon={Github} linkTo="https://github.com/KritiusOne" />
            <ExternalLink Icon={Instagram} linkTo="https://www.instagram.com/rour10/" />
          </li>
      </ListContainer>
    </footer>
  )
}