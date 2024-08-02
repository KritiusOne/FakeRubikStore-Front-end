import { AddressUserInfo } from '@/components/AddressUserInfo'
import { Layout } from '@/components/Layout'
import { TabsCollection } from '@/components/TabsCollection'
import { Tab } from '@/components/ui/Tab'
import { UserInfo } from '@/components/UserInfo'
import React, { useState } from 'react'

export const ProfileConfig = () => {
  const [showTab, setShowTab] = useState(false)
  const handleClickTab = (e:React.MouseEvent<HTMLLIElement>) =>{
    if(e.currentTarget.id == "profile"){
      setShowTab(false)
    }else{
      setShowTab(true)
    }
  }
  return (
    <Layout>
      <main className='w-full h-full p-2 my-10 bg-bgLight flex flex-col justify-start gap-2'>
        <h1 className='text-pretty text-start text-2xl text-bgDark font-bold font-mono uppercase'>Información de tu perfil</h1>
        <TabsCollection>
          <Tab onClick={handleClickTab} id='profile' TabTitle='Informacion del usuario' state={!showTab} />
          <Tab onClick={handleClickTab} id='address' TabTitle='Dirección de envío' state={showTab} />
        </TabsCollection>
        <div>
          {
            !showTab && <UserInfo />
          }
          {
            showTab && <AddressUserInfo />
          }
        </div>
      </main>
    </Layout>
  )
}
