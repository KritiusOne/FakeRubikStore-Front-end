import { InputHTMLAttributes } from "react"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  stateData: "success" | "error" | "normal"
}
export const Input: React.FC<Props> = ({stateData = "normal ", ...props})=>{
  return (
    <input {...props} className={`bg-bgDark outline-none border-b-2 border border-solid w-full rounded-sm p-1.5 border-x-0 border-t-0 ${stateData == "error" ? "border-red-500 placeholder:text-red-500" : stateData == "success" ? "border-green placeholder:text-green" : ""}`}  />
  )
}