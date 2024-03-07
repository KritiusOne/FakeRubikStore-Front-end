import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLElement> {
  title: string
}
export const ListContainer: React.FC<Props> = ({title, children, ...props})=>{
  return (
    <ul {...props} className={`flex flex-col justify-center items-start gap-2 px-10 text-bgLight ${props.className}`}>
      <h4 className="font-oswald font-bold text-xl"> {title} </h4>
      {
        children
      }
    </ul>
  )
}