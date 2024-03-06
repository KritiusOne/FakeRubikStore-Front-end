import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  children: JSX.Element | JSX.Element[]
}
export const ButtonCollection: React.FC<Props> = ({children, ...props})=>{
  return (
    <section {...props} className={`w-full flex flex-col justify-center items-start ${props.className} gap-2`}>
      {
        children
      }
    </section>
  )
}