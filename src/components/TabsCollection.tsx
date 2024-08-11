import React from 'react'

interface Props {
  children: React.ReactNode
}

export const TabsCollection: React.FC<Props> = ({ children }) => {
  return (
    <ul className='w-full border-b-solid border-b-[1px] border-bgDark box-border'>
      {children}
    </ul>
  )
}
