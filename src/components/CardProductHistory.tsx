import { DeliveryStates } from '@/lib/DeliveryStates'
import { OrderProduct } from '@/types/OrdersTypes'
import React from 'react'
import { Button } from './ui/Button'

interface Props {
  dateBuy: Date
  stateDelivery: number
  nameProduct: string
  img: string
  allProductInOrder: OrderProduct[]
}
const getSimpleDate = (DateBuy: Date) => {
  const date = new Date(DateBuy)
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ]
  const Meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
  return `${day} de ${Meses[month]} del ${year}`
}
const getInWordStateDelivery = (stateDelivery: number) => {
  return DeliveryStates[stateDelivery].toString().replace("_", " ")
}
export const CardProductHistory: React.FC<Props> = ({ dateBuy, nameProduct, stateDelivery, img, allProductInOrder }) => {

  return (
    <article className='w-full flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg bg-white'>
      <header className='px-2 py-0.5 border-b-[1px] border-solid border-slate-300'>
        <h3 className='pl-4 text-xl text-pretty text-start'>
          {
            getSimpleDate(dateBuy)
          }
        </h3>
      </header>
      <main className='flex flex-col lg:flex-row items-center w-full gap-4 px-3 py-3'>
        <aside className='max-w-16 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
          <img
            className='w-full'
            src={img}
            alt={`Imagen representativa de ${nameProduct}`}
            title={nameProduct} />
        </aside>
        <section className='flex flex-col lg:flex-row justify-evenly items-center flex-1'>
          <strong className={`${stateDelivery == 1 ? "text-green" : "text-primaryRed"} text-pretty`}>
            {
              getInWordStateDelivery(stateDelivery)
            }
          </strong>
          {
            stateDelivery == 1 && <i className='text-green text-balance'> Entregado hace poco </i>
          }
          <p className='flex flex-col justify-center items-center'>
            {
              allProductInOrder.map((productOrder, index) => {
                if(index<3)
                  return <span key={`${productOrder.idOrder}${productOrder.idProduct}`}> {productOrder.productInfo.name} </span>
              })
            }
          </p>
        </section>
        <section>
          <Button primary={true} size='extraLarge' > Ver Orden completa </Button>
        </section>
      </main>
    </article>
  )
}
