import { AllProductsGrid } from '@/components/AllProductsGrid'
import { Layout } from '@/components/Layout'
import { OrderDetailsHistory } from '@/components/OrderDetailsHistory'
import { Spinner } from '@/components/ui/Spinner'
import { OrderProductToProduct } from '@/lib/ProductMapper'
import { Order } from '@/types/OrdersTypes'
import { Product } from '@/types/ProductsTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const ShoppingDetails: React.FC = () => {
  const getURL = useURLStorage(Storage => Storage.GetOrderById)
  const location = useLocation()
  const UserSesion = useUserSesion()
  const [load, setLoad] = useState(false)
  const [OrderDetails, setOrderDetails] = useState<Order>()
  const [products, setProducts] = useState<Product[]>()
  useEffect(() => {
    const getInfoOrderById = async () => {
      try {
        if (UserSesion.infoUser != null) {
          const id = location.search.split("=")[1]
          const URL = getURL(id)
          setLoad(true)
          const res = await fetch(URL, {
            "method": "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: `${UserSesion.typetoken} ${UserSesion.token}`
            }
          })
          if (res.ok) {
            const response: Order = await res.json()
            const parsedProducts: Product[] = []
            response.orderProducts.forEach(orderProduct => {
              const newProduct = OrderProductToProduct(orderProduct)
              parsedProducts.push(newProduct)
            })
            console.log(response)
            setOrderDetails(response)
            setProducts(parsedProducts)
          }
          setLoad(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getInfoOrderById()
  }, [])
  return (
    <Layout>
      <main className='w-10/12 h-full flex flex-col justify-center items-center bg-bgLight my-10 px-4 py-3 gap-4'>
        {
          load && <Spinner colorSpinner='blue' />
        }
        {
          !load && products != undefined  && OrderDetails != null && (
            <>
              <h1 className='text-2xl font-medium text-center text-pretty font-mono'> Detalles de la Orden #{OrderDetails.deliveryInfo.code} </h1>
              <AllProductsGrid allProducts={products} />
              <OrderDetailsHistory 
              code={OrderDetails.deliveryInfo.code} 
              date={OrderDetails.date}
              finalPrice={OrderDetails.finalPrice}
              idState={OrderDetails.deliveryInfo.idState} />
            </>
          )
        }
      </main>
    </Layout>
  )
}
