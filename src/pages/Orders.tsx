import { CardOrdertHistory } from '@/components/CardOrderHistory'
import { Layout } from '@/components/Layout'
import { Paginated } from '@/components/ui/Paginated'
import { PAGE_NUMBER_DEFAULT, PAGE_SIZE_DEFAULT } from '@/lib/PetitionDataType'
import { Order } from '@/types/OrdersTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'

export const Orders: React.FC = () => {
  const [pageNumber, setPageNumber] = useState(PAGE_NUMBER_DEFAULT)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [AllOrders, setAllOrders] = useState<PaginatedResponse<Order[]>>()
  const TOKEN = useUserSesion(storage => `${storage.typetoken} ${storage.token}`)
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
          //response.response = response.response.filter((orderUsers)=> orderUsers.deliveryInfo.idState != 5)
          setAllOrders(response)
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
        <div>
          Aqui van a ir los filtros
        </div>
        <div className='flex flex-col justify-center items-center gap-2'>
          {
            AllOrders != undefined && AllOrders.response.filter(orderUser => orderUser.deliveryInfo.idState != 5).map((order)=><article className=' w-full flex flex-col justify-center items-center border-solid border-primaryRed border-2 px-2 py-1 rounded-lg' key={order.id}>
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
