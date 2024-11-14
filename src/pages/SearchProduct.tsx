import { FiltersSearchProducts } from '@/components/FiltersSearchProducts'
import { Layout } from '@/components/Layout'
import { CardProduct } from '@/components/ui/CardProduct'
import { Spinner } from '@/components/ui/Spinner'
import { AllDataProduct } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useProductStorage } from '@/zustand/ProductStorage'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const SearchProduct: React.FC = () => {
  const { load, setLoad } = useProductStorage()
  const location = useLocation()
  const [products, setProducts] = useState<PaginatedResponse<AllDataProduct[]>>({
    metaData: {
      currentPage: 0,
      pageSize: 0,
      totalCount: 0,
      totalPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      previousPageURL: "",
      nextPageURL: ""
    },
    msg: "",
    statusCode: 0,
    response: [],
  })
  useEffect(()=>{
    const getSearchedProducts = async()=>{
      const params = new URLSearchParams(location.search)
      const URL = import.meta.env.VITE_API_URL_GET_ALL_PRODUCTS_ALL_INFO
      const FINAL_URL = `${URL}?${params.toString()}`
      setLoad(true)
      try {        
        const res = await fetch(FINAL_URL)
        if(res.ok){
          const response: PaginatedResponse<AllDataProduct[]> = await res.json()
          if(products.metaData.currentPage != response.metaData.currentPage &&response.metaData.currentPage > 1){
            setProducts({
              ...response,
              response: [...products.response, ...response.response]
            })
          }else{
            setProducts({...response})
          }
          setProducts(response)
        }
      } catch (error) {
        console.log(error)
      }finally {
        setLoad(false)
      }
    }
    getSearchedProducts()
  }, [location.search])
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
              products.response.length == 0 && <Spinner />
            }
            {
              products.response.length != 0 && !load && products.response.map((product)=> <CardProduct price={product.price}  
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
