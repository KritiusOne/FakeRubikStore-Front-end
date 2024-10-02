import { getSimpleDate } from '@/lib/DateManagment'
import { getInWordStateDelivery } from '@/lib/DeliveryStates'
import React from 'react'
import { Button } from './ui/Button'
import { useUserSesion } from '@/zustand/UserStorage'
import { URLSearchParams } from 'url'

interface Props {
  idState: number
  date: Date
  finalPrice: number
  code: string
}
export const OrderDetailsHistory: React.FC<Props> = ({date, idState, code, finalPrice}) => {
  return (
    <div className='w-full flex flex-col justify-center items-center md:grid md:grid-cols-2 gap-4'>
      <section className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] flex flex-col items-start justify-center px-4 py-3 rounded-lg'>
        <div className='flex flex-row justify-start items-center w-full gap-4'>
          <h2 className={`${idState == 5 || idState == 1 ? "text-red-700" : "text-green"} text-xl font-thin `} >
            {
              getInWordStateDelivery(idState)
            }
          </h2>
          <span className='text-sm text-balance font-extralight'>
            {
              getSimpleDate(date)
            }
          </span>
        </div>
        <p>
          {
            idState == 1 && "Aún no hemos atendido su pedido, si desea mas información comuniquese por medio de las redes que aparecen al final de la pagina"
          }
          {
            idState == 2 && "Estamos preparando su pedido"
          }
          {
            idState == 3 && "Su pedido ya fue enviado exitosamente en la fecha correspondiente, dentro de poco debería llegarle sin contratiempos"
          }
          {
            idState == 4 && "Su pedido ya fue Entregado exitosamente en la fecha correspondiente."
          }
          {
            idState == 5 && "Usted decidió cancelar su pedido. Lo esperamos para la proxima"
          }
        </p>
      </section>
      <aside className='shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg flex flex-col px-4 py-3'>
        <h2 className='text-xl font-semibold font-mono'> Detalles de la compra </h2>
        <span className='font-extralight text-sm'>
          {getSimpleDate(date)} | envío #{code}
        </span>
        <span className='text-md'> Costo Total: <strong> COP {finalPrice} </strong> </span>
      </aside>
      
    </div>
  )
}
