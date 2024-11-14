import { FiltersSearchProducts } from '@/components/FiltersSearchProducts'
import { Layout } from '@/components/Layout'
import { CardProduct } from '@/components/ui/CardProduct'
import { Spinner } from '@/components/ui/Spinner'
import { AllDataProduct } from '@/types/ProductsTypes'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const SearchProduct: React.FC = () => {
  const [products, setProducts] = useState<AllDataProduct[]>([])
  const location = useLocation()
  useEffect(()=>{
    const getSearchedProducts = async()=>{
      const href = window.location.href
      console.log({location, href})
    }
    getSearchedProducts()
  }, [])
  return (
    <Layout className='flex flex-col gap-2 justify-center items-center'>
      <div className='w-full h-full my-5 bg-bgLight flex flex-col justify-start items-center px-4 py-2'>
        <h1 className='text-3xl font-bold text-center text-pretty font-oswald'>Resultados de busqueda</h1>
        <div className='w-full h-full my-5 px-4 py-2 flex flex-col md:flex-row justify-between items-start bg-bgLight'>
          <aside className='flex flex-row md:flex-col justify-center md:justify-start items-start md:items-center  gap-3 md:gap-1 px-2 py-1'>
            <FiltersSearchProducts />
          </aside>
          <main className='flex flex-col flex-1 justify-center items-center px-4 py-2 gap-2'>
            {
              products.length == 0 && <Spinner />
            }
            {
              products.length != 0 && products.map((product)=> <CardProduct price={product.price}  
              productId={product.id}
              thumbnail={product.thumbnail} 
              title={product.name}
              key={product.id} />)
            }
          </main>
        </div>
      </div>
    </Layout>
  )
}
