import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface TableCompound extends React.FC<Props> {
  Header: React.FC<PropsHeader>;
  HeaderTitle: React.FC<PropsTableHeaderTitle>;
  Body: React.FC<Props>;
  BodyRow: React.FC<PropsTableBodyRow>;
  Cell: React.FC<Props>;
}
export const Table: TableCompound = ({ children }) => {
  return (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      {children}
    </table>
  )
}
interface PropsHeader {
  children: ReactNode
}
export const TableHeader: React.FC<PropsHeader> = ({ children }) => {
  return (
    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
      <tr>
        {children}
      </tr>
    </thead>
  )
}
interface PropsTableHeaderTitle {
  children: ReactNode
}
export const TableHeaderTitle: React.FC<PropsTableHeaderTitle> = ({ children }) => {
  return (
    <th scope="col" className="px-6 py-3">
      {children}
    </th>
  )
}
export const TableBody: React.FC<Props> = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  )
}
interface PropsTableBodyRow {
  children: ReactNode
  title: string
}
export const TableBodyRow: React.FC<PropsTableBodyRow> = ({ children, title }) => {
  return (
    <tr className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {title}
      </th>
      {
        children
      }
    </tr>
  )
}
export const TableCell: React.FC<Props> = ({children}) => {
  return (
    <td className="px-6 py-4">
      {children}
    </td>
  )
}
Table.Header = TableHeader;
Table.HeaderTitle = TableHeaderTitle;
Table.Body = TableBody;
Table.BodyRow = TableBodyRow;
Table.Cell = TableCell;