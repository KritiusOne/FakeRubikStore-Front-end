import React, { useEffect, useState } from 'react'
import { Button } from './ui/Button'
import { IconPlus } from '@tabler/icons-react'
import { useURLStorage } from '@/zustand/URLStorage'
import { Spinner } from './ui/Spinner'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { Product } from '@/types/ProductsTypes'
import { Table } from './Table'

const INITIAL_PAGE_SIZE = 10
const INITIAL_PAGE_NUMBER = 1
export const ProductsDashboard: React.FC = () => {
  const [load, setLoad] = useState(false)
  const [PageSize] = useState(INITIAL_PAGE_SIZE)
  const [PageNumber] = useState(INITIAL_PAGE_NUMBER)
  const URL_BASE = useURLStorage(Storage => Storage.Products)
  const [InfoProducts, setInfoProducts] = useState<PaginatedResponse<Product[]>>()
  useEffect(()=>{
    const getProducts = async()=>{
      const params = new URLSearchParams()
      params.append("PageSize", PageSize.toString())
      params.append("PageNumber", PageNumber.toString())
      try {
        setLoad(true)
        const res = await fetch(URL_BASE + params.toString())
        if(res.ok){
          const response: PaginatedResponse<Product[]> = await res.json()
          setInfoProducts(response)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getProducts()    
  }, [PageSize, PageNumber])
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
        <Button primary={true} size='extraLarge' className='flex-row'> <span className='flex flex-row gap-1'><IconPlus /> Agregar producto</span></Button>
      </div>
      <div className='w-full overflow-x-auto shadow-md sm:rounded-lg'>
        {
          load && (<div className='w-full flex justify-center items-center'><Spinner /></div>)
        }
        {
          !load && InfoProducts != undefined && (
            <Table>
              <Table.Header>
                <Table.HeaderTitle>Id</Table.HeaderTitle>
                <Table.HeaderTitle>Nombre</Table.HeaderTitle>
                <Table.HeaderTitle>Precio</Table.HeaderTitle>
                <Table.HeaderTitle>Acciones</Table.HeaderTitle>
              </Table.Header>
              <Table.Body>
                {
                  InfoProducts.response.map(product=> {
                    return (
                      <Table.BodyRow title={product.id.toString()}>
                        <Table.Cell>
                          {product.name}
                        </Table.Cell>
                        <Table.Cell>
                          {product.price}
                        </Table.Cell>
                        <Table.Cell>
                          <Button>Action</Button>
                        </Table.Cell>
                      </Table.BodyRow>
                    )
                  })
                }
              </Table.Body>
            </Table>
          )
        }
      </div>
    </div>
  )
}
