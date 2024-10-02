import React, { ReactNode } from 'react'


interface Props {
  children: ReactNode
}
interface TableCompound extends React.FC<Props> {
  Header: React.FC<PropsHeader>;
  HeaderTitle: React.FC<PropsTableHeaderTitle>;
  Body: React.FC<Props>;
  BodyRow: React.FC<PropsTableBodyRow>;
  Cell: React.FC<PropsCell>;
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
    <th scope="col" className="px-2 md:px-6 py-3 text-center">
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
    <tr className='odd:bg-bgLight even:bg-gray-50 text-gray-800 border-b dark:border-gray-700'>
      <th scope="row" className="md:px-6 py-4 font-medium whitespace-nowrap dark:text-white text-center px-2">
        {title}
      </th>
      {
        children
      }
    </tr>
  )
}
interface PropsCell extends React.TdHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode
}
export const TableCell: React.FC<PropsCell> = ({children, ...props}) => {
  return (
    <td {...props} className={`px-2 md:px-6 py-4 text-center text-wrap ${props.className}`}>
      {children}
    </td>
  )
}
Table.Header = TableHeader;
Table.HeaderTitle = TableHeaderTitle;
Table.Body = TableBody;
Table.BodyRow = TableBodyRow;
Table.Cell = TableCell;