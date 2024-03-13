import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
}
export const Badge: React.FC<Props> = ({title, ...props})=>{
  return (
    <article {...props} className={`text-bgLight text-lg bg-primaryRed font-light min-w-20 max-w-2 p-0 rounded-3xl text-center ${props.className}`}>
    {title}
  </article>
  )
}