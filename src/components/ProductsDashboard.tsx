import React from 'react'
import { Button } from './ui/Button'
import { IconEdit, IconPlus, IconX } from '@tabler/icons-react'
import { Spinner } from './ui/Spinner'
import { Table } from './Table'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { Product } from '@/types/ProductsTypes'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_ADMIN_ROUTES } from '@/routes/TypesRoutes'
interface Props {
  load: boolean
  InfoProducts?: PaginatedResponse<Product[]>
  myRef: React.RefObject<HTMLDivElement>
}
const ProductsDashboard: React.FC<Props> = ({ load, InfoProducts, myRef }) => {
  const navegate = useNavigate()
  const navegateEditProduct = (infoProducto: Product) => {
    const baseURL = PRIVATE_ADMIN_ROUTES.EDIT_PRODUCT.split(":")
    const urlParams = new URLSearchParams()
    urlParams.set("id", infoProducto.id.toString())
    const finalURL = `${baseURL[0]}${baseURL[1]}?${urlParams.toString()}`
    navegate(finalURL)
  }
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center gap-4'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
        <Button onClick={() => navegate(PRIVATE_ADMIN_ROUTES.CREATE_PRODUCT)} primary={true} size='extraLarge' className='flex-row'> <span className='flex flex-row gap-1'><IconPlus /> Agregar producto</span></Button>
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
                  InfoProducts.response.map(product => {
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
                            <Button onClick={() => navegateEditProduct(product)}>
                              <IconEdit />
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
        <div ref={myRef} className='w-full flex justify-center items-center'>
          {
            load && <Spinner />
          }
        </div>
      </div>
    </div>
  )
}
export default ProductsDashboard;