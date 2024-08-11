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
      {
        hasNextPage && <Button primary={true} size='extraLarge'  onClick={()=> onNext() }>Siguiente</Button>
      }
    </>
  )
}
