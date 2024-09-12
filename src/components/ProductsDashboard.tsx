import React, { LegacyRef } from 'react'
import { Button } from './ui/Button'
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react'
import { Spinner } from './ui/Spinner'
import { Table } from './Table'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { Product } from '@/types/ProductsTypes'
interface Props {
  load: boolean
  InfoProducts?: PaginatedResponse<Product[]>
  myRef: React.RefObject<HTMLDivElement>
}
export const ProductsDashboard: React.FC<Props> = ({load, InfoProducts, myRef}) => {
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
        <Button primary={true} size='extraLarge' className='flex-row'> <span className='flex flex-row gap-1'><IconPlus /> Agregar producto</span></Button>
      </div>
      <div className='w-full overflow-x-auto shadow-md sm:rounded-lg'>
        {
          InfoProducts != undefined && (
            <Table >
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
                      <Table.BodyRow key={product.id} title={product.id.toString()}>
                        <Table.Cell>
                          {product.name}
                        </Table.Cell>
                        <Table.Cell>
                          {product.price}
                        </Table.Cell>
                        <Table.Cell>
                          <div className='w-full h-full flex flex-row justify-center items-center gap-2'>
                            <Button>
                              <IconEdit />
                            </Button>
                            <Button>
                              <IconX />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.BodyRow>
                    )
                  })
                }
              </Table.Body>
            </Table>
          )
        }
        {
          <div ref={myRef} className='w-full flex justify-center items-center'>
            {
              load && <Spinner />
            }
          </div>
        }
      </div>
    </div>
  )
}
