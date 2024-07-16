import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLLabelElement> {
  children: JSX.Element | JSX.Element[] | string
}
export const Label: React.FC<Props> = ({children, ...props})=>{
  return (
    <label {...props} className={`text-sm font-medium text-bgLight ${props.className}`}> {children} </label>
  )
}