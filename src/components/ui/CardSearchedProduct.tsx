import { RouteImage } from '@/lib/CreateRouteImage'
import { AllDataProduct } from '@/types/ProductsTypes'
import React from 'react'
import { Badge } from '../Badge'
import { Button } from './Button'
import { formatURLtoNavParams } from '@/lib/SearchLibrary'
import { PUBLIC_ROUTES } from '@/routes/TypesRoutes'
import { useNavigate } from 'react-router-dom'
import { IconArrowRight } from '@tabler/icons-react'
import { CartIcon } from './icons/CartIcon'
import { useCartStorage } from '@/zustand/CartStorage'

interface Props {
  productInfo: AllDataProduct
}
export const CardSearchedProduct: React.FC<Props> = ({ productInfo }) => {
  const navigate = useNavigate()
  const { add } = useCartStorage()
  const handleClickViewProduct = ()=>{
    const params = new URLSearchParams()
    params.append("id", productInfo.id.toString())
    const FINAL_URL = formatURLtoNavParams(params, PUBLIC_ROUTES.VIEW_PRODUCT)
    navigate(FINAL_URL)
  }
  const handleAddProduct = ()=> {
    add(1, productInfo.id, productInfo.name, productInfo.price, productInfo.thumbnail)
  }
  return (
    <article className='w-full flex flex-col md:flex-row gap-2 justify-between items-center border-primaryRed border-lg border-2 rounded-lg overflow-hidden'>
      <div className='w-40 h-40'>
        <img src={RouteImage(productInfo.image)} alt={`Imagen del producto ${productInfo.name}`}
          className='h-full w-full object-cover' />
      </div>
      <main className='flex-1 flex flex-col justify-center items-center gap-2 px-2'>
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
        <Button className='flex flex-row gap-1 justify-center items-center' onClick={()=> handleClickViewProduct()} size='extraLarge'> 
          Ver producto <IconArrowRight /> </Button>
        <Button onClick={()=> handleAddProduct()} primary size='extraLarge' className='flex flex-row justify-center items-center gap-1'> Agregar al carrito <CartIcon /> </Button>
      </footer>
    </article>
  )
}
