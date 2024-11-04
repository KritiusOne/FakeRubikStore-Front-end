import { Layout } from '@/components/Layout'
import { TabsCollection } from '@/components/TabsCollection'
import { AsignateTag, CreateTag } from '@/components/TagSections'
import { Tab } from '@/components/ui/Tab'
import React, { useState } from 'react'

type TShowTab = "CREATE" | "SET"

export const SetTags: React.FC = () => {
  const [showTab, setShowTab] = useState<TShowTab>("CREATE")
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight px-2 py-4'>
        <TabsCollection>
          <Tab onClick={()=> setShowTab("CREATE")} TabTitle='Crear nuevo tag' state={showTab == "CREATE"} />
          <Tab TabTitle='Asignar tag' state={showTab == "SET"} onClick={()=> setShowTab("SET")} />
        </TabsCollection>
        {
          showTab == "CREATE" && <CreateTag />
        }
        {
          showTab == "SET" && <AsignateTag />
        }
      </main>
    </Layout>
  )
}
