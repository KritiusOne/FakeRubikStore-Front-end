import { Product } from '@/types/ProductsTypes'
import React from 'react'
import { CardProduct } from './ui/CardProduct'

interface Props {
  allProducts: Product[]
}
export const AllProductsGrid: React.FC<Props> = ({allProducts}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full px-4 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-3">
      {
        allProducts.map(prod => <CardProduct price={prod.price} productId={prod.id} thumbnail={prod.thumbnail} title={prod.name} key={prod.id} className='border-solid border-[1px] border-bgDark' />)
      }
    </div>
  )
}
