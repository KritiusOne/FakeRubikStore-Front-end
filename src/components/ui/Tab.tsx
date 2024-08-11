import React, { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLLIElement> {
  TabTitle: string
  state: boolean
}

export const Tab: React.FC<Props> = ({ TabTitle, state, id, ...props }) => {
  return (
    <li {...props} id={id} className={`inline-block px-2 py-1  cursor-pointer hover:bg-gray-400 ${state ? "border-b-green border-b-2" : "border-b-transparent border-b-2"} active:bg-white rounded-t-sm`}>
      <span className={`${state ? "text-green text-lg font-bold" : "text-bgDark text-lg font-semibold"} me-2`} >
        {TabTitle}
      </span>
    </li>
  )
}
