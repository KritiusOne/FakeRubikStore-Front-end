import { Layout } from '@/components/Layout'
import { TabsCollection } from '@/components/TabsCollection'
import { Spinner } from '@/components/ui/Spinner'
import { Tab } from '@/components/ui/Tab'
import { getGroupRegisters } from '@/lib/getGroupRegisters'
import { Order } from '@/types/OrdersTypes'
import { Product } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { UserOrderInfo } from '@/types/UserTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'

interface Props { }

type TypesTabs = "Products" | "Users" | "Sells"
const INITIAL_PAGE_SIZE = 10
const INITIAL_PAGE_NUMBER = 1

const ProductsDashboard = lazy(() => import("@/components/ProductsDashboard"))
const OrdersDashboard = lazy(() => import("@/components/OrdersDashboard"))
const UsersDashboard = lazy(()=> import("@/components/UsersDashboard"))


export const PanelControl: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<TypesTabs>("Products")
  //loaders
  const [load, setLoad] = useState(false)
  const [LoadOrders, setLoadOrders] = useState(false)
  const [loadUsers, setLoadUsers] = useState(false)
  //Fetching de datos
  const [PageSize] = useState(INITIAL_PAGE_SIZE)
  const [PageNumberProducts, setPageNumberProducts] = useState(INITIAL_PAGE_NUMBER)
  const [PageNumberOrders, setPageNumberOrders] = useState(INITIAL_PAGE_NUMBER)
  const [PageNumberUsers, setPageNumberUsers] = useState(INITIAL_PAGE_NUMBER)
  const { AllOrders, Products, GetAllUsers } = useURLStorage()
  const { token, typetoken } = useUserSesion()
  //Respuestas del fetching
  const [InfoProducts, setInfoProducts] = useState<PaginatedResponse<Product[]>>({
    metaData: {
      currentPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPageURL: "",
      previousPageURL: "",
      pageSize: 0,
      totalCount: 0,
      totalPage: 0
    },
    msg: "",
    response: [],
    statusCode: 404
  })
  const [OrdersInfo, setOrdersInfo] = useState<PaginatedResponse<Order[]>>({
    metaData: {
      currentPage: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPageURL: "",
      previousPageURL: "",
      pageSize: 0,
      totalCount: 0,
      totalPage: 0
    },
    msg: "",
    response: [],
    statusCode: 404
  })
  const [UsersInfo, setUsersInfo] = useState<PaginatedResponse<UserOrderInfo[]>>({
    metaData: {
      currentPage: 0,
      pageSize: 0,
      totalPage: 0,
      totalCount: 0,
      hasNextPage: false,
      hasPreviousPage: false,
      nextPageURL: "",
      previousPageURL: ""
    },
    msg: "",
    response: [],
    statusCode: 404
  })
  // Referencias
  const tableProductsRef = useRef<HTMLDivElement>(null)
  const tableOrdersRef = useRef<HTMLDivElement>(null)
  const tableUsersRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (activeTab != "Products" || InfoProducts.metaData.currentPage == PageNumberProducts) return
    setLoad(true)
    getGroupRegisters<Product[]>(PageSize.toString(), PageNumberProducts.toString(), `${typetoken} ${token}`, Products).then(res => {
      if (res != undefined) {
        setInfoProducts(prev => ({
          metaData: {
            ...res.metaData,
            totalCount: res.metaData.totalCount + prev.metaData.totalCount,
          },
          msg: res.msg,
          response: [...prev.response, ...res.response],
          statusCode: res.statusCode
        }))

      }
    }).finally(() => setLoad(false))
  }, [PageNumberProducts])
  useEffect(() => {
    if (activeTab != "Sells" || OrdersInfo.metaData.currentPage == PageNumberOrders) return
    setLoadOrders(true)
    getGroupRegisters<Order[]>("5", PageNumberOrders.toString(), `${typetoken} ${token}`, AllOrders).then(res => {
      if (res != undefined) {
        setOrdersInfo(prev => ({
          metaData: {
            ...res.metaData,
            totalCount: res.metaData.totalCount + prev.metaData.totalCount,
          },
          msg: res.msg,
          response: [...prev.response, ...res.response],
          statusCode: res.statusCode
        }))
      }
    }).finally(() => setLoadOrders(false))

  }, [PageNumberOrders, activeTab])
  useEffect(()=>{
    if (activeTab != "Users" ) return
    setLoadUsers(true)
    getGroupRegisters<UserOrderInfo[]>(PageSize.toString(), "1", `${typetoken} ${token}`, GetAllUsers).then(res => {
      if (res != undefined) {
        setUsersInfo(prev => ({
          metaData: res.metaData,
          msg: res.msg,
          response: [...prev.response, ...res.response],
          statusCode: res.statusCode
        }))
      }
    }).finally(() => setLoadUsers(false))
  }, [PageNumberUsers, activeTab])
  const manageTabs = (id: string) => {
    if (id == 'Products') {
      setActiveTab("Products")
      return
    }
    if (id == "Users") {
      setActiveTab("Users")
      return
    }
    if (id == "Sells") {
      setActiveTab("Sells")
      return
    }
  }
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      const first = entries[0]
      if (first.isIntersecting && InfoProducts.metaData.hasNextPage) setPageNumberProducts(prev => prev + 1)
    })
    if (!load && observer && tableProductsRef.current) observer.observe(tableProductsRef.current)
    return () => {
      if (observer) observer.disconnect()
    }
  })
  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      const first = entries[0]
      if (first.isIntersecting && OrdersInfo.metaData.hasNextPage) setPageNumberOrders(prev => prev + 1)
    })
    if (!LoadOrders && observer && tableOrdersRef.current) observer.observe(tableOrdersRef.current)
    return () => {
      if (observer) observer.disconnect()
    }
  })
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight flex flex-col justify-center items-center px-2 py-3 gap-2'>
        <h1 className='text-3xl font-semibold text-pretty text-center'>Panel de control</h1>
        <TabsCollection>
          <Tab onClick={(e) => manageTabs(e.currentTarget.id)} id='Products' TabTitle='Productos' state={activeTab == "Products"} />
          <Tab onClick={(e) => manageTabs(e.currentTarget.id)} id='Users' TabTitle='Usuarios' state={activeTab == "Users"} />
          <Tab onClick={(e) => manageTabs(e.currentTarget.id)} id='Sells' TabTitle='Ventas' state={activeTab == "Sells"} />
        </TabsCollection>
        {
          activeTab == "Products" && (
            <Suspense fallback={<Spinner />}>
              <ProductsDashboard myRef={tableProductsRef} load={load} InfoProducts={InfoProducts} />
            </Suspense>
          )
        }
        {
          activeTab == "Sells" && (
            <Suspense fallback={<Spinner />}>
              <OrdersDashboard myRef={tableOrdersRef} load={LoadOrders} InfoOrders={OrdersInfo.response} />
            </Suspense>
          )
        }
        {
          activeTab == "Users" && (
            <Suspense fallback={<Spinner />}>
              <UsersDashboard load={loadUsers} myRef={tableUsersRef} InfoUsers={UsersInfo.response} />
            </Suspense>
          )
        }
      </main>
    </Layout>
  )
}
