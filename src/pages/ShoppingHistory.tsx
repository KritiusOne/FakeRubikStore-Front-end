import { Layout } from '@/components/Layout'
import { Spinner } from '@/components/ui/Spinner'
import { BasicOrderInfo } from '@/types/OrdersTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'

export const ShoppingHistory: React.FC = () => {
  const [load, setLoad] = useState(false)
  const UserSesion = useUserSesion()
  const GetURL = useURLStorage(Storage => Storage.GetAllOrdersByUser)
  const [PaginatedOrdersByUser, setPaginatedOrdersByUser] = useState<PaginatedResponse<BasicOrderInfo[]>>()
  const [pageOrders, setPageOrders] = useState(1)
  useEffect(()=>{
    const getAllOrdersByUser = async()=>{
      if(UserSesion.infoUser == null)
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
        if(res.ok){
          const response:PaginatedResponse<BasicOrderInfo[]> = await res.json()
          setPaginatedOrdersByUser(response)
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
      <main className='bg-bgLight w-screen h-full my-10 flex flex-col justify-center items-center'>
        {
          load && <Spinner />
        }
        {
          PaginatedOrdersByUser != undefined && <span className='max-w-[100ch] '> {JSON.stringify(PaginatedOrdersByUser)} </span>
        }
      </main>
    </Layout>
  )
}
