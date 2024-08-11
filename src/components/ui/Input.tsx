import { InputHTMLAttributes, useMemo } from "react"
import React from "react"
import { ColorsSupported } from "@/types/StyleTypes" 
import classNames from "classnames"

interface Props extends InputHTMLAttributes<HTMLInputElement>{
  uniqueBorder?: boolean
  inputColor?: keyof ColorsSupported
}
const getColorClasses = (uniqueBorder: boolean, inputColor: keyof ColorsSupported) => {
  const baseClasses: ColorsSupported = {
    blue: 'focus:border-blue-700 focus:placeholder-blue-700',
    red: 'focus:border-red-500 focus:placeholder-red-500',
    yellow: 'focus:border-yellow-300 focus:text-yellow-300  focus:placeholder-yellow-300',
    Dark: 'focus:border-black focus:placeholder-black',
    Light: 'focus:border-white focus:placeholder-white',
  };

  const inputUniqueBorder: ColorsSupported = {
    blue: 'focus:border-blue-700 focus:placeholder-blue-700 hover:border-slate-900',
    red: 'focus:border-red-700 focus:placeholder-red-700 hover:border-slate-900',
    yellow: 'focus:border-yellow-400 focus:placeholder-yellow-400 hover:border-slate-900',
    Dark: 'focus:border-slate-700 focus:placeholder-grey-500 hover:border-black',
    Light: 'focus:border-white focus:placeholder-grey-500 hover:border-slate-500',
  };

  return uniqueBorder ? `bg-transparent border-b-solid border-b-2 ${inputUniqueBorder[inputColor]}` : `border-2 border ${baseClasses[inputColor]}`;
};
export const Input: React.FC<Props> = ({uniqueBorder = false, inputColor = "Dark",...props})=>{
  const inputClass = useMemo(()=> classNames(`placeholder:text-sm outline-none px-2 py-1 rounded-sm w-full border-slate-300 ${inputColor == "Light" ? "bg-transparent hover:border-yellow-200 text-white focus:border-yellow-500": "bg-slate-100  hover:border-slate-700"}  ${getColorClasses(uniqueBorder, inputColor)}`), [inputColor, uniqueBorder])
  return (
    <input {...props} className={`ease-out ${inputClass}`}  />
  )
}