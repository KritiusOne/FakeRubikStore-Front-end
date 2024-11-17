import React, { useMemo } from 'react'
import { ColorsSupported, Sizes } from "@/types/StyleTypes.ts"
import classNames from 'classnames'

interface Props {
  size: keyof Sizes
  colorCheckBox: keyof ColorsSupported,
  state: boolean
  handleChangeChecked: (id:number)=> void
  id: number
}

const getColorBorderCheckbox = (colorSelected: keyof ColorsSupported)=>{
  const options: ColorsSupported = {
    Dark: "border-black",
    Light: "border-white",
    blue: "border-blue-700",
    red: "border-red-700",
    yellow: "border-yellow-400"
  }
  return options[colorSelected]
}
const getSizeBorderContainer = (size: keyof Sizes)=>{
  const options: Sizes = {
    large: "w-8 h-8 border-4 text-lg",
    medium: "w-6 h-6 border-[3px] text-md",
    small: "w-5 h-5 border-[1px] text-sm"
  }
  return options[size]
}
const getColorChecked = (color: keyof ColorsSupported)=>{
  const options: ColorsSupported = {
    Dark: "after:bg-black",
    Light: "after:bg-white",
    blue: "after:bg-blue-700",
    red: "after:bg-red-700",
    yellow: "after:bg-yellow-400"
  }
  return `after:transition-transform after:ease-out after:duration-100 after:absolute ${options[color]}`
}
export const Checkbox: React.FC<Props> = ({colorCheckBox = "Dark", size = "large", handleChangeChecked, state, id}) => {
  const container = useMemo(()=> classNames(`block relative cursor-pointer border-4 border-solid select-none ${getColorBorderCheckbox(colorCheckBox)} ${getSizeBorderContainer(size)}`), [colorCheckBox, size])
  const afterCheked = useMemo(()=> classNames(`after:content-[''] after:top-1/4 after:left-1/4 after:w-1/2 after:h-1/2 ${getColorChecked(colorCheckBox)} ${state ? "after:scale-100" : "after:scale-0"}`), [colorCheckBox, state])

  return (
    <label className={container} >
      <input type="checkbox" className='absolute opacity-0 cursor-pointer h-0 w-0' checked={state} onChange={()=> handleChangeChecked(id) } />
      <div className={`absolute top-0 left-0 w-full h-full ${afterCheked} `}></div>
    </label>
  )
}