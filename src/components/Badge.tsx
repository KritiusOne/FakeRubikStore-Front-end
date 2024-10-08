import React from 'react'

interface Props {
  title: string
}
export const Badge: React.FC<Props> = ({title}) => {
  return (
    <span className=' text-sm bg-green text-white text-nowrap rounded p-1'> {title} </span>
  )
}
