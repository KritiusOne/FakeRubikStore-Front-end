import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLSpanElement> {
  title: string
}
export const Badge: React.FC<Props> = ({ title, ...props }) => {
  return (
    <span {...props} className={`text-sm bg-green text-white text-nowrap rounded p-1 ${props.className}`}> {title} </span>
  )
}
