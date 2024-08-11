import { CardOrdertHistory } from '@/components/CardOrderHistory'
import { Layout } from '@/components/Layout'
import { Input } from '@/components/ui/Input'
import { Paginated } from '@/components/ui/Paginated'
import { Spinner } from '@/components/ui/Spinner'
import { Order } from '@/types/OrdersTypes'
import { MetaData } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'


const INITIAL_PAGE_NUMBER = 1
const INITIAL_PAGE_SIZE = 3
export const ShoppingHistory: React.FC = () => {
  const [load, setLoad] = useState(false)
  const UserSesion = useUserSesion()
  const GetURL = useURLStorage(Storage => Storage.GetAllOrdersByUser)
  const [meta, setMeta] = useState<MetaData>()
  const [filter, setFilter] = useState("")
  const [response, setResponse] = useState<Order[]>()

  const handleClickNextPage = async () => {
    try {
      if (meta != undefined && !load && UserSesion.infoUser != null) {
        const URL = GetURL(UserSesion.infoUser.Id, meta.currentPage + 1, INITIAL_PAGE_SIZE)
        setLoad(true)
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${UserSesion.typetoken} ${UserSesion.token}`
          }
        })
        if (res.ok) {
          const response: PaginatedResponse<Order[]> = await res.json()
          setResponse(response.response)
          setMeta(response.metaData)
          setLoad(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickPreviwsPage = async () => {
    try {
      if (meta != undefined && !load && UserSesion.infoUser != null) {
        const URL = GetURL(UserSesion.infoUser.Id, meta.currentPage - 1, INITIAL_PAGE_SIZE)
        setLoad(true)
        const res = await fetch(URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${UserSesion.typetoken} ${UserSesion.token}`
          }
        })
        if (res.ok) {
          const response: PaginatedResponse<Order[]> = await res.json()
          setResponse(response.response)
          setMeta(response.metaData)
          setLoad(false)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const getAllOrdersByUser = async () => {
      if (UserSesion.infoUser == null)
        return
      setLoad(true)
      try {
        const URL = GetURL(UserSesion.infoUser.Id, INITIAL_PAGE_NUMBER, INITIAL_PAGE_SIZE)
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
        <header className='w-10/12 px-4 flex flex-row justify-start gap-2 items-center'>
          <div className='max-w-60'>
            <Input inputColor='blue' placeholder='Buscar' value={filter} onChange={(e) => setFilter(e.currentTarget.value)} />
          </div>
          {
            response != undefined && <span> {response.length} Ordenes </span>
          }
        </header>
        <div>
          {
            load && <Spinner />
          }
        </div>
        <div className='w-10/12 px-4 py-3 flex flex-col justify-center items-center gap-4'>
          {
            !load && response != undefined && filter == "" && response.map((OrderOfUser) => <CardOrdertHistory
              idOrder={OrderOfUser.id.toString()}
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
              OrderByUser.orderProducts.forEach(orderProduct => {
                if (returnable) {
                  return
                }
                returnable = orderProduct.productInfo.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
              })
              return returnable
            }).map((OrderOfUser) => <CardOrdertHistory
              key={OrderOfUser.id}
              idOrder={OrderOfUser.id.toString()}
              dateBuy={OrderOfUser.date}
              nameProduct={OrderOfUser.orderProducts[0].productInfo.name}
              stateDelivery={OrderOfUser.deliveryInfo.idState}
              img={OrderOfUser.orderProducts[0].productInfo.thumbnail}
              allProductInOrder={OrderOfUser.orderProducts} />
            )
          }
        </div>
        <footer className='w-10/12 px-4 py-3 flex flex-row justify-center items-center gap-2'>
          {
            !load && meta != undefined && <Paginated onPreviws={handleClickPreviwsPage} onNext={handleClickNextPage} actualPage={meta.currentPage} hasNextPage={meta.hasNextPage} />
          }
        </footer>
      </main>
    </Layout>
  )
}
