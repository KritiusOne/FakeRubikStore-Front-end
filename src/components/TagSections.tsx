import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { useProductStorage } from '@/zustand/ProductStorage'
import { useURLStorage } from '@/zustand/URLStorage'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { RouteImage } from '@/lib/CreateRouteImage'

interface Props extends HTMLAttributes<HTMLDivElement> {

}
export const CreateTag: React.FC<Props> = ({ ...props }) => {
  const { AllProducts, getProducts } = useProductStorage()
  const { Products } = useURLStorage()
  const [ProductsIds, setProductsIds] = useState<number[]>([])
  useEffect(() => {
    if (AllProducts.length == 0) {
      const params = new URLSearchParams()
      params.append("PageSize", "100")
      params.append("PageNumber", "1")
      getProducts(Products + params.toString())
    }
  }, [])
  const handleClickAdd = (IdProduct:number)=>{
    if(ProductsIds.includes(IdProduct)) return
    setProductsIds(prev => [...prev, IdProduct])
  }
  const handleClickDelete = (IdProduct:number)=>{
    if(!ProductsIds.includes(IdProduct)) return
    const aux = ProductsIds.filter(id => id != IdProduct)
    setProductsIds(aux)
  }
  return (
    <div {...props} className={`w-full flex flex-col justify-center items-center px-2 py-4 gap-2`}>
      <h2 className='text-3xl font-bold font-oswald'>Crear nuevo tag</h2>
      <Input placeholder='3x3' />
      <div className=''>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            AllProducts.map(product => <article className='select-none w-40 max-h-72 border border-solid border-black flex flex-col justify-center ' key={product.id}>
              <section className='w-full h-3/5'>
                <img src={RouteImage(product.thumbnail)} className='w-full h-full' alt={`imagen de ${product.name}`} />
              </section>
              <main className='w-full h-full flex flex-col justify-center items-center px-2 py-1'>
                <h6 className='text-pretty'> {product.name} </h6>
                {
                  !ProductsIds.includes(product.id) ? (
                    <span onClick={()=> handleClickAdd(product.id)} className='bg-green rounded-xl cursor-pointer select-none transition-all ease-in-out hover:opacity-65'>
                      <IconPlus className='text-white font-bold' />
                    </span>
                  ) : (
                    <span onClick={()=>handleClickDelete(product.id)} className='bg-red-700 rounded-xl cursor-pointer select-none transition-all ease-in-out hover:opacity-65'>
                      <IconMinus className='text-white font-bold' />
                    </span>
                  )
                }
              </main>
            </article>)
          }
        </div>
      </div>
      <Button primary size='extraLarge'>Crear nuevo tag</Button>
    </div>
  )
}
