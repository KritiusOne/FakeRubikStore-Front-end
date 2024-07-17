import { HTMLAttributes, HTMLProps } from "react"

interface Props extends HTMLProps<HTMLLabelElement> {
  children: JSX.Element | JSX.Element[] | string
  stateData?: "success" | "error" | "normal"
}
export const Label: React.FC<Props> = ({stateData = "normal",children, ...props})=>{
  return (
    <label {...props} className={`text-sm font-medium ${stateData == "success"? "text-green" : stateData == "error" ? "text-red-500" : "text-bgLight"}`}> {children} </label>
  )
}