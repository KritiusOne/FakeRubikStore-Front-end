import React from 'react'
import { Button } from './Button'

interface Props {
  actualPage: number
  hasNextPage: boolean
  onNext: ()=>void
  onPreviws: ()=> void
}
export const Paginated: React.FC<Props> = ({actualPage = 1, hasNextPage, onNext, onPreviws }) => {

  return (
    <>
      {
        actualPage > 1 && <Button primary={true} size='extraLarge' onClick={()=> onPreviws()}>Previa</Button>
      }
      <span className="relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-primaryRed hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex"> {actualPage} </span>
      {
        hasNextPage && <Button primary={true} size='extraLarge'  onClick={()=> onNext() }>Siguiente</Button>
      }
    </>
  )
}
