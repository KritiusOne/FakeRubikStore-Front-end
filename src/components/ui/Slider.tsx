import React from 'react'

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  min: number
  max: number
  value: number
}
export const Slider: React.FC<Props> = ({max, min, value, ...props}) => {
  return (
    <>
    <input {...props} className={"w-full h-3 py-1 bg-bgDark rounded-lg appearance-none cursor-pointer"} 
    type="range" 
    min={min} 
    max={max} 
    value={value} />
    </>
    
  )
}
