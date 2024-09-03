import { AllProductsGrid } from '@/components/AllProductsGrid'
import { Layout } from '@/components/Layout'
import { OrderDetailsHistory } from '@/components/OrderDetailsHistory'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Spinner } from '@/components/ui/Spinner'
import { OrderProductToProduct } from '@/lib/ProductMapper'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'
import { Order } from '@/types/OrdersTypes'
import { Product } from '@/types/ProductsTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ShoppingDetails: React.FC = () => {
  const getURL = useURLStorage(Storage => Storage.GetOrderById)
  const location = useLocation()
  const UserSesion = useUserSesion()
  const [load, setLoad] = useState(false)
  const [OrderDetails, setOrderDetails] = useState<Order>()
  const [products, setProducts] = useState<Product[]>()
  const [showModal, setShowModal] = useState(false)
  const navegation = useNavigate()
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
  const deliveryCancel = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL_UPDATE_DELIVERY_STATE
    const params = new URLSearchParams()
    if(OrderDetails != undefined && UserSesion.infoUser != null){
      params.append("Id", OrderDetails.idDelivery.toString())
      params.append("newState", "5")
      const FINAL_URL = BASE_URL + params.toString()
      try{
        const res = await fetch(FINAL_URL, {
          method: "PUT",
          headers: {
            Authorization: `${UserSesion.typetoken} ${UserSesion.token}`
          }
        })
        if(res.ok){
          setShowModal(true)
          setTimeout(()=>{
            navegation(PRIVATE_USER_ROUTES.SHOPPING_HISTORY)
          }, 2000)
        }
      }catch (error){
        console.log(error)
      }
    }
  }
  return (
    <Layout>
      <main className='w-10/12 h-full flex flex-col justify-center items-center bg-bgLight my-10 px-4 py-3 gap-4'>
        {
          load && <Spinner colorSpinner='blue' />
        }
        {
          !load && products != undefined && OrderDetails != null && (
            <>
              <h1 className='text-2xl font-medium text-center text-pretty font-mono'> Detalles de la Orden #{OrderDetails.deliveryInfo.code} </h1>
              <AllProductsGrid allProducts={products} />
              <OrderDetailsHistory
                code={OrderDetails.deliveryInfo.code}
                date={OrderDetails.date}
                finalPrice={OrderDetails.finalPrice}
                idState={OrderDetails.deliveryInfo.idState} />
              <div className='w-full flex flex-row justify-center items-center'>
                {
                  OrderDetails.deliveryInfo.idState == 1 && <Button onClick={() => deliveryCancel()} primary={false} size='extraLarge'> Cancelar </Button>
                }
                {
                  UserSesion.infoUser != null && UserSesion.infoUser.IdRole != "2" && OrderDetails.deliveryInfo.idState < 4 &&
                  <Button primary={true} size='extraLarge'>Pasar a la siguiente etapa</Button>
                }
              </div>
            </>
          )
        }
        {
          showModal && (
            <Dialog onClose={()=> setShowModal(true)}>
              <div className='w-full h-full text-center flex flex-col justify-center items-center bg-bgLight py-4'>
                <h4 className='text-3xl font-semibold text-pretty text-primaryRed'> HAZ CANCELADO TU COMPRA CON EXITO! </h4>
                <strong className='text-xl text-balance'>Dentro de breves momentos estarás siendo redirigido a la pagina anterior</strong>
                <Spinner colorSpinner='yellow' />
              </div>
            </Dialog>
          )
        }
      </main>
    </Layout>
  )
}
