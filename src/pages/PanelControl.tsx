import { Layout } from '@/components/Layout'
import { TabsCollection } from '@/components/TabsCollection'
import { Tab } from '@/components/ui/Tab'
import React from 'react'

interface Props{}

export const PanelControl: React.FC<Props> = () => {
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight flex flex-col justify-center items-center px-2 py-3 gap-2'>
        <h1 className='text-3xl font-semibold text-pretty text-center'>Panel de control</h1>
        <TabsCollection>
          <Tab TabTitle='Productos' state={false} />
          <Tab TabTitle='Usuarios' state={false} />
          <Tab TabTitle='Ventas' state={false} />
        </TabsCollection>
      </main>
    </Layout>
  )
}
