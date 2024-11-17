import { RouteImage } from '@/lib/CreateRouteImage'
import { AllDataProduct } from '@/types/ProductsTypes'
import React from 'react'
import { Badge } from '../Badge'
import { Button } from './Button'

interface Props {
  productInfo: AllDataProduct
}
export const CardSearchedProduct: React.FC<Props> = ({ productInfo }) => {
  console.log(productInfo)
  return (
    <article className='w-full flex flex-col md:flex-row gap-2 justify-between items-center border-primaryRed border-lg border-2 rounded-lg overflow-hidden'>
      <div className='w-40 h-40'>
        <img src={RouteImage(productInfo.image)} alt={`Imagen del producto ${productInfo.name}`}
          className='h-full w-full object-cover' />
      </div>
      <main className='flex-1 flex flex-col justify-center items-center gap-2'>
        <h3 className='text-3xl text-pretty font-bold font-oswald text-center'> {productInfo.name} </h3>
        <span> Precio: <strong> {productInfo.price} </strong> </span>
        <div className='flex flex-row justify-center items-center gap-3 flex-wrap'>
          {
            productInfo.productCategories.map(tag => <Badge 
              key={`${tag.idCategory}${tag.idProduct}`}
              title={ tag.categoryNav != undefined ? tag.categoryNav.name : ""}
              className='bg-green text-white' />)
          }
        </div>
      </main>
      <footer className='flex flex-col justify-center items-center gap-2 px-4 py-2'>
        <Button size='extraLarge'> Ver producto </Button>
        <Button primary size='extraLarge'> Agregar al carrito </Button>
      </footer>
    </article>
  )
}
