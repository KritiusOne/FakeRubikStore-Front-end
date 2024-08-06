import { Layout } from '@/components/Layout'
import { Spinner } from '@/components/ui/Spinner'
import { UpdateInfoUser } from '@/components/UpdateInfoUser'
import { UpdateUserAddressInfo } from '@/components/UpdateUserAddressInfo'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
interface Props {

}
export const EditUserInfo: React.FC<Props> = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const [typeUpdate, setTypeUpdate] = useState(0)
  const [load, setLoad] = useState(false)
  const userInfo = useUserSesion(Storage => Storage.infoUser)

  useEffect(()=>{
    try {
      setLoad(true)
      if(params.get("id") == "1")
        setTypeUpdate(1)
      else if(params.get("id") == "2")
        setTypeUpdate(2)
      setLoad(false)
    } catch (error) {
      console.log(error)
    }
  }, [])
  
  return (
    <Layout>
      <main className='flex flexcol justify-center items-center bg-bgLight w-full h-full my-10 py-4 px-3'>
        {
          load && <Spinner />
        }
        <form className='flex flex-col justify-center items-center w-1/2 h-full gap-2'>
          {
            typeUpdate == 1 && <UpdateInfoUser 
            Id={userInfo?.Id} 
            first_name={userInfo?.First_Name}
            last_name={userInfo?.Last_Name}
            actualEmail={userInfo?.email}
            actualPhone={userInfo?.phone} />
          }
          {
            typeUpdate == 2 && <UpdateUserAddressInfo id={userInfo != null ? parseInt(userInfo.IdAddress) : 0} />
          }
        </form>
      </main>
    </Layout>
  )
}
