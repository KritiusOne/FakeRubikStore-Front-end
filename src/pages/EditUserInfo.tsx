import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { UpdateInfoUser } from '@/components/UpdateInfoUser'
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
            typeUpdate == 2 && (
              <>
              <div className='flex flex-col justify-center items-center gap-0.5'>
                <h1 className='text-xl text-pretty font-bold capitalize'> Ingrese los datos donde desea recibir sus envíos </h1>
                <strong className="text-sm text-balance before:content-['*'] before:ml-0.5 before:text-red-500"> Campos opcionales</strong>

              </div>
              <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
                <label htmlFor='name' className='font-semibold text-left'>Ingrese su Dirección</label>
                <Input id="name" placeholder='Cr. 1 Calle 1 Mz 1 Barrio' autoComplete='off'  />
              </div>
              <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
                <label htmlFor='name' className='font-semibold text-left'>Ingrese su Ciudad</label>
                <Input id="name" placeholder='Bogotá' autoComplete='off'  />
              </div>
              <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
                <label htmlFor='name' className='font-semibold text-left'>Ingrese su departamento/estado</label>
                <Input id="name" placeholder='Cundinamarca' autoComplete='off'  />
              </div>
              <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
                <label htmlFor='name' className='font-semibold text-left'>Ingrese su país</label>
                <Input id="name" placeholder='Colombia' autoComplete='off'  />
              </div>
              <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
                <label htmlFor='name' className="font-semibold text-left after:content-['*'] after:ml-0.5 after:text-red-500">Ingrese su Descripción</label>
                <Input id="name" placeholder='***' autoComplete='off'  />
              </div>
              <Button primary={true} size='extraLarge'>Actualizar datos</Button>
              </>
            )
          }
        </form>
      </main>
    </Layout>
  )
}
