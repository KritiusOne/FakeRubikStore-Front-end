import { CardProductHistory } from '@/components/CardProductHistory'
import { Layout } from '@/components/Layout'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { Order } from '@/types/OrdersTypes'
import { MetaData } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'

export const ShoppingHistory: React.FC = () => {
  const [load, setLoad] = useState(false)
  const UserSesion = useUserSesion()
  const GetURL = useURLStorage(Storage => Storage.GetAllOrdersByUser)
  const [pageOrders, setPageOrders] = useState(1)
  const [meta, setMeta] = useState<MetaData>()
  const [filter, setFilter] = useState("")
  const [response, setResponse] = useState<Order[]>()
  useEffect(() => {
    const getAllOrdersByUser = async () => {
      if (UserSesion.infoUser == null)
        return
      setLoad(true)
      try {
        const URL = GetURL(UserSesion.infoUser.Id)
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${UserSesion.typetoken} ${UserSesion.token}`
          }
        })
        if (res.ok) {
          const response: PaginatedResponse<Order[]> = await res.json()
          setMeta(response.metaData)
          setPageOrders(response.metaData.currentPage)
          console.log(response.metaData.currentPage)
          setResponse(response.response)
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAllOrdersByUser()
  }, [])
  return (
    <Layout>
      <main className='bg-bgLight w-11/12 h-full my-10 flex flex-col justify-start items-center gap-3 box-border py-5'>
        <h1 className='text-3xl font-bold text-center text-pretty'> Historial de compras </h1>
        <div>
          {
            load && <Spinner />
          }
        </div>
        <header className='w-10/12 px-4 flex flex-row justify-start gap-2 items-center'>
          <div className='max-w-60'>
            <Input inputColor='blue' placeholder='Buscar' value={filter} onChange={(e)=> setFilter(e.currentTarget.value) } />
          </div>
          {
            response != undefined && <span> {response.length} Ordenes </span>
          }
        </header>
        <div className='w-10/12 px-4 py-3 flex flex-col justify-center items-center gap-4'>
          {
            !load && response != undefined && filter == "" && response.map((OrderOfUser) => <CardProductHistory
              dateBuy={OrderOfUser.date}
              nameProduct={OrderOfUser.orderProducts[0].productInfo.name}
              stateDelivery={OrderOfUser.deliveryInfo.idState}
              key={OrderOfUser.id}
              img={OrderOfUser.orderProducts[0].productInfo.thumbnail}
              allProductInOrder={OrderOfUser.orderProducts} />)
          }
          {
            !load && response != undefined && filter != "" && 
            response.filter(OrderByUser => {
              let returnable = false
              OrderByUser.orderProducts.forEach(orderProduct=>{
                if(returnable){
                  return
                }
                returnable = orderProduct.productInfo.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
              })
              return returnable
            }).map((OrderOfUser)=> <CardProductHistory
              key={OrderOfUser.id}
              dateBuy={OrderOfUser.date}
              nameProduct={OrderOfUser.orderProducts[0].productInfo.name}
              stateDelivery={OrderOfUser.deliveryInfo.idState}
              img={OrderOfUser.orderProducts[0].productInfo.thumbnail}
              allProductInOrder={OrderOfUser.orderProducts} />
            )
          }
        </div>
      </main>
    </Layout>
  )
}
