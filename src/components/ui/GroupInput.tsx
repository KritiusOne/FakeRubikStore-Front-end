import React, { InputHTMLAttributes, useId } from 'react'
import { Input } from './Input'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelTitle: string
}

export const GroupInput: React.FC<Props> = ({labelTitle, ...props}) => {
  const hintId = useId()
  return (
    <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
      <label htmlFor={hintId} className='font-semibold text-left'> {labelTitle} </label>
      <Input {...props} id={hintId} />
    </div>
  )
}
