import { FiltersSearchProducts } from '@/components/FiltersSearchProducts'
import { Layout } from '@/components/Layout'
import { CardProduct } from '@/components/ui/CardProduct'
import { Paginated } from '@/components/ui/Paginated'
import { Spinner } from '@/components/ui/Spinner'
import { FiltersProductsNames } from '@/lib/SearchLibrary'
import { AllDataProduct } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useProductStorage } from '@/zustand/ProductStorage'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const INITIAL_PAGE_NUMBER = 1
export const SearchProduct: React.FC = () => {
  const { load, setLoad, MaxPriceValue, MinPriceValue, setMaxPrice, setMinPrice } = useProductStorage()
  const navegate = useNavigate()
  const location = useLocation()
  const [PageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER)
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
  useEffect(() => {
    const getSearchedProducts = async () => {
      const params = new URLSearchParams(location.search)
      const URL = import.meta.env.VITE_API_URL_GET_ALL_PRODUCTS_ALL_INFO
      const FINAL_URL = `${URL}?${params.toString()}`
      if (params.has(FiltersProductsNames.PageNumber)
        && Number(params.get(FiltersProductsNames.PageNumber)) != PageNumber) {
        setPageNumber(Number(params.get(FiltersProductsNames.PageNumber)))
      }
      setLoad(true)
      try {
        const res = await fetch(FINAL_URL)
        if (res.ok) {
          const response: PaginatedResponse<AllDataProduct[]> = await res.json()
          setProducts({ ...response })
          setProducts(response)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
        if (params.has(FiltersProductsNames.MaxPrice) == true && Number(params.get(FiltersProductsNames.MaxPrice)) != MaxPriceValue) {
          setMaxPrice(Number(params.get(FiltersProductsNames.MaxPrice)))
        }

        if (params.has(FiltersProductsNames.MinPrice) == true && Number(params.get(FiltersProductsNames.MinPrice)) != MinPriceValue) {
          setMinPrice(Number(params.get(FiltersProductsNames.MinPrice)))
        }
      }
    }
    getSearchedProducts()
  }, [location.search])
  const handleNumberPage = (numberPage: number) => {
    const params = new URLSearchParams(location.search)
    params.set(FiltersProductsNames.PageNumber, numberPage.toString())
    setPageNumber(numberPage)
    const FINAL_URL = `${location.pathname}?${params.toString()}`
    navegate(FINAL_URL, { replace: true })
  }
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
              products.response.length == 0 && load && <Spinner />
            }
            {
              products.response.length != 0 && !load && products.response.map((product) => <CardProduct price={product.price}
                productId={product.id}
                thumbnail={product.thumbnail}
                title={product.name}
                key={product.id} />)
            }
          </main>
        </div>
        <div className='flex flex-row gap-2'>
          <Paginated
            actualPage={PageNumber}
            hasNextPage={products.metaData.hasNextPage}
            onNext={() => handleNumberPage(PageNumber + 1)}
            onPreviws={() => handleNumberPage(PageNumber - 1)} />
        </div>
      </div>
    </Layout>
  )
}
