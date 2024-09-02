import { DeliveryStates, getInWordStateDelivery } from '@/lib/DeliveryStates'
import { OrderProduct } from '@/types/OrdersTypes'
import React from 'react'
import { Button } from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'
import { getSimpleDate } from '@/lib/DateManagment'

interface Props {
  dateBuy: Date
  stateDelivery: number
  nameProduct: string
  img: string
  allProductInOrder: OrderProduct[],
  idOrder: string
}


export const CardOrdertHistory: React.FC<Props> = ({ dateBuy, nameProduct, stateDelivery, img, allProductInOrder, idOrder }) => {
  const navegate = useNavigate()
  const handleClickButton = () => {
    const ruta = PRIVATE_USER_ROUTES.SHOPPING_DETAILS.split(":")
    const params = new URLSearchParams()
    params.append("id", idOrder)
    navegate(`${ruta[0]}${ruta[1]}?${params.toString()}`)
  }
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
          <strong className={`${stateDelivery == 5 ? "text-green" : "text-primaryRed"} text-pretty`}>
            {
              getInWordStateDelivery(stateDelivery)
            }
          </strong>
          <p className='flex flex-col justify-center items-center text-balance text-center'>
            {
              allProductInOrder.map((productOrder, index) => {
                if (index < 3)
                  return <span key={`${productOrder.idOrder}${productOrder.idProduct}`}
                    className='max-w-[20ch] '> {productOrder.productInfo.name} </span>
              })
            }
            {
              allProductInOrder.length > 3 && <span> Y otros {allProductInOrder.length - 3} más...  </span>
            }
          </p>
        </section>
        <section>
          <Button primary={true} size='extraLarge' onClick={handleClickButton} > Ver Orden completa </Button>
        </section>
      </main>
    </article>
  )
}
