import { CardOrdertHistory } from '@/components/CardOrderHistory'
import { Layout } from '@/components/Layout'
import { Dropdown } from '@/components/ui/Dropdown'
import { Paginated } from '@/components/ui/Paginated'
import { isLowerDay, isLowerMonth, isLowerWeek } from '@/lib/DateManagment'
import { PAGE_NUMBER_DEFAULT, PAGE_SIZE_DEFAULT } from '@/lib/PetitionDataType'
import { Order } from '@/types/OrdersTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'

const STATES = ["General","No atendido", "En preparacion", "Enviado", "Recibido", "Cancelado"]
const DATES = ["Todos","Hoy", "Semana pasada", "Hace un mes"]
export const Orders: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER_DEFAULT)
  const [pageSize] = useState(PAGE_SIZE_DEFAULT)
  const [AllOrders, setAllOrders] = useState<PaginatedResponse<Order[]>>()
  const TOKEN = useUserSesion(storage => `${storage.typetoken} ${storage.token}`)
  const [selectedStateOrder, setSelectedStateOrder] = useState("General")
  const [selectedDate, setSelectedDate] = useState("Todos")
  useEffect(()=>{
    async function getAllOrders(){
      const params = new URLSearchParams()
      const BASE_URL = import.meta.env.VITE_API_URL_GET_ALL_Orders
      if(pageSize != undefined){
        params.append("PageSize", pageSize.toString())
      }
      if(pageNumber != undefined){
        params.append("PageNumber", pageNumber.toString())
      }
      /*
      if(dateDay != undefined){
        params.append("Date", dateDay.toString())
      }
      if(minDate != undefined){
        params.append("MinDate", minDate.toString())
      }
      if(maxDate != undefined){
        params.append("MaxDate", maxDate.toString())
      }
      if(minPrice != undefined){
        params.append("MinPrice", minPrice.toString())
      }
      if(maxPrice != undefined){
        params.append("MaxPrice", maxPrice.toString())
      }
      if(IdUser != undefined){
        params.append("IdUser", IdUser.toString())
      }
      */
      const FINAL_URL = BASE_URL + params.toString()
      try {
        const res = await fetch(FINAL_URL, {
          method: "GET",
          headers: {
            Authorization: TOKEN
          }
        })
        if(res.ok){
          const response: PaginatedResponse<Order[]> = await res.json()
          const finalResponse: PaginatedResponse<Order[]> = {
            metaData: response.metaData,
            msg: response.msg,
            statusCode: response.statusCode,
            response: response.response.reverse()
          }
          setAllOrders(finalResponse)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrders()
  }, [pageNumber, pageSize])
  return (
    <Layout>
      <main className='w-full h-full my-10 py-3 px-4 flex flex-col justify-center items-center gap-3 bg-bgLight'>
        <h1 className='text-3xl font-bold text-bgDark text-pretty'> Ordenes </h1>
        <div className='w-full flex flex-col md:flex-row justify-center items-center gap-3'>
          <Dropdown handleChange={(state)=> setSelectedStateOrder(state)} AllOptions={STATES} title='Filtrar por estados' />
          <Dropdown AllOptions={DATES} handleChange={(e)=> setSelectedDate(e)} title='Filtrar por fecha' />
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          {
            AllOrders != undefined && AllOrders.response.filter(orderUser =>{
              const indexOf = STATES.indexOf(selectedStateOrder)
              if(indexOf > 0){
                return indexOf == orderUser.deliveryInfo.idState
              }
              return orderUser.deliveryInfo.idState < 4
            }).filter(orderUser =>{
              const indexOf = DATES.indexOf(selectedDate)
              const date = new Date(orderUser.date)
              if(indexOf == 1){
                return isLowerDay(date)
              }
              if(indexOf == 2){
                return isLowerWeek(date)
              }
              if(indexOf == 3){
                return isLowerMonth(date)
              }
              return true
            }).map((order)=><article className=' w-full flex flex-col justify-center items-center border-solid border-primaryRed border-2 px-2 py-1 rounded-lg' key={order.id}>
              <h3 className='text-xl text-primaryRed'> {order.userInfo.name + " " + order.userInfo.secondName} </h3>
              <CardOrdertHistory 
              allProductInOrder={order.orderProducts} 
              dateBuy={order.date}
              idOrder={order.id.toString()}
              img={order.orderProducts[0].productInfo.thumbnail}
              nameProduct={order.orderProducts[0].productInfo.name}
              stateDelivery={order.deliveryInfo.idState}
               />
            </article>)
          }
        </div>
        <footer className='w-full flex flex-row justify-center items-center gap-2'>
          {
            AllOrders && <Paginated 
            actualPage={AllOrders.metaData.currentPage}
            hasNextPage={AllOrders.metaData.hasNextPage}
            onNext={()=> setPageNumber(AllOrders.metaData.currentPage + 1)}
            onPreviws={()=> setPageNumber(AllOrders.metaData.currentPage - 1)} />
          }
        </footer>
      </main>
    </Layout>
  )
}
