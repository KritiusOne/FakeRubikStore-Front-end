import { Order } from '@/types/OrdersTypes'
import React from 'react'
import { Table } from './Table'
import { Spinner } from './ui/Spinner'
import { IconArrowRight } from '@tabler/icons-react'
import { Button } from './ui/Button'
import { getSimpleDate } from '@/lib/DateManagment'

interface Props {
  load: boolean
  InfoOrders?: Order[]
  myRef: React.RefObject<HTMLDivElement>
}
const OrdersDashboard: React.FC<Props> = ({ load, myRef, InfoOrders }) => {
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de Ordenes</h2>
      </div>
      <div className='w-full overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center items-center gap-2'>
      </div>
      {
        InfoOrders != undefined && <Table>
          <Table.Header>
            <Table.HeaderTitle>Id</Table.HeaderTitle>
            <Table.HeaderTitle>Comprador</Table.HeaderTitle>
            <Table.HeaderTitle>Total</Table.HeaderTitle>
            <Table.HeaderTitle>Numero de productos</Table.HeaderTitle>
            <Table.HeaderTitle>Fecha</Table.HeaderTitle>
            <Table.HeaderTitle>Acciones</Table.HeaderTitle>
          </Table.Header>
          <Table.Body>
            {
              InfoOrders.map(OldOrder => {
                return (
                  <Table.BodyRow key={OldOrder.id} title={OldOrder.id.toString()}>
                    <Table.Cell>
                      {OldOrder.userInfo.name}
                    </Table.Cell>
                    <Table.Cell>
                      {OldOrder.finalPrice + " " + "COP"}
                    </Table.Cell>
                    <Table.Cell>
                      <span className={
                        OldOrder.orderProducts.length >= 3 ? "text-red-600" : ""
                      }> {OldOrder.orderProducts.length} </span>
                    </Table.Cell>
                    <Table.Cell>
                      {getSimpleDate(OldOrder.date)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className='w-full h-full flex flex-row justify-center items-center gap-2'>
                        <Button>
                          <IconArrowRight />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.BodyRow>
                )
              })
            }
          </Table.Body>
        </Table>
      }
      <div ref={myRef}>
        {
          load && <Spinner />
        }
      </div>
    </div>
  )
}
export default OrdersDashboard;