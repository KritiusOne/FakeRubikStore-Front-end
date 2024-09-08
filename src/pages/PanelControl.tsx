import { Layout } from '@/components/Layout'
import { ProductsDashboard } from '@/components/ProductsDashboard'
import { TabsCollection } from '@/components/TabsCollection'
import { Tab } from '@/components/ui/Tab'
import React, { useState } from 'react'

interface Props{}

type TypesTabs = "Products" | "Users" | "Sells"
export const PanelControl: React.FC<Props> = () => {
  const [activeTab, setActiveTab] = useState<TypesTabs>("Products")
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
          activeTab == "Products" && <ProductsDashboard />
        }
      </main>
    </Layout>
  )
}
