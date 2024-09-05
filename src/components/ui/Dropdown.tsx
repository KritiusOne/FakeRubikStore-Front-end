import React, { useId } from 'react'

interface Props {
  AllOptions: string[]
  title: string
  handleChange: (stateDelivery: string)=> void
}
export const Dropdown: React.FC<Props> = ({AllOptions, title, handleChange}) => {
  const UUId = useId()
  return (
    <form className="max-w-sm mx-auto">
      <label htmlFor={UUId} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> {title} </label>
      <select onChange={(e)=> handleChange(e.currentTarget.value.trim().toLowerCase()) } defaultValue={AllOptions[0]} id={UUId} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {
          AllOptions.map((option, i)=> <option value={option} key={i}> {option} </option>)
        }
      </select>
    </form>
  )
}
