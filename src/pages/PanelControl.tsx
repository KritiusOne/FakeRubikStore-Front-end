import { Layout } from '@/components/Layout'
import { ProductsDashboard } from '@/components/ProductsDashboard'
import { TabsCollection } from '@/components/TabsCollection'
import { Tab } from '@/components/ui/Tab'
import { Product } from '@/types/ProductsTypes'
import { PaginatedResponse } from '@/types/ResponseTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import React, { useEffect, useRef, useState } from 'react'

interface Props{}

type TypesTabs = "Products" | "Users" | "Sells"
const INITIAL_PAGE_SIZE = 10
const INITIAL_PAGE_NUMBER = 1
export const PanelControl: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<TypesTabs>("Products")
  const [load, setLoad] = useState(false)
  const [PageSize] = useState(INITIAL_PAGE_SIZE)
  const [PageNumberProducts, setPageNumber] = useState(INITIAL_PAGE_NUMBER)
  const URL_BASE = useURLStorage(Storage => Storage.Products)
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
  const tableProductsRef = useRef<HTMLDivElement>(null)
  const getProducts = async()=>{
    if(activeTab != "Products"){
      return
    }
    const params = new URLSearchParams()
    params.append("PageSize", PageSize.toString())
    params.append("PageNumber", PageNumberProducts.toString())
    try {
      setLoad(true)
      const res = await fetch(URL_BASE + params.toString())
      if(res.ok){
        const response: PaginatedResponse<Product[]> = await res.json()
        setInfoProducts((prev)=> ({
          metaData: response.metaData,
          msg: response.msg,
          response: [...prev.response, ...response.response],
          statusCode: response.statusCode
        }))
        setLoad(false)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getProducts()    
  }, [PageNumberProducts])
  const manageTabs = (id: string)=>{
    if(id == 'Products'){
      setActiveTab("Products")
      return
    }
    if(id == "Users"){
      setActiveTab("Users")
      return
    }
    if(id == "Sells"){
      setActiveTab("Sells")
      return
    }
  }
  const OnObserver = async(entries: any[])=>{
    const first = entries[0]
    if(first.isIntersecting && InfoProducts.metaData.hasNextPage) setPageNumber(prev => prev + 1)
  }
  useEffect(()=>{
    const observer = new IntersectionObserver(OnObserver)
    if(!load && observer && tableProductsRef.current) observer.observe(tableProductsRef.current)
    return () => {
      if(observer) observer.disconnect()
    }
  })
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight flex flex-col justify-center items-center px-2 py-3 gap-2'>
        <h1 className='text-3xl font-semibold text-pretty text-center'>Panel de control</h1>
        <TabsCollection>
          <Tab onClick={(e)=> manageTabs(e.currentTarget.id)} id='Products' TabTitle='Productos' state={activeTab == "Products"} />
          <Tab onClick={(e)=> manageTabs(e.currentTarget.id)} id='Users' TabTitle='Usuarios' state={activeTab == "Users"} />
          <Tab onClick={(e)=> manageTabs(e.currentTarget.id)} id='Sells' TabTitle='Ventas' state={activeTab == "Sells"} />
        </TabsCollection>
        {
          activeTab == "Products" && <ProductsDashboard myRef={tableProductsRef} load={load} InfoProducts={InfoProducts} />
        }
      </main>
    </Layout>
  )
}
