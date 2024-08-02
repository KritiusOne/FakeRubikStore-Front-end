import React from 'react'
import { UserData } from './ui/UserData'
import { useUserSesion } from '@/zustand/UserStorage'
import { IconAddressBook, IconMail, IconUser } from '@tabler/icons-react'
import { Button } from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'

interface Props {

}
export const UserInfo: React.FC<Props> = () => {
  const userInfo = useUserSesion(Storage => Storage.infoUser)
  const navegate = useNavigate()
  const handleClickButton = ()=>{
    const params = new URLSearchParams()
    params.set("id", "1")
    const routeBase = PRIVATE_USER_ROUTES.EDIT_USER_INFO.split(":")
    navegate(routeBase[0] + routeBase[1] + "?" + params.toString())
  }
  return (
    <div className='flex flex-col justify-center items-center gap-2 px-2 py-4'>
      <UserData 
      Icon={IconUser} 
      info={ userInfo != null ? userInfo.First_Name + " " + userInfo.Last_Name : "Nombre no recibido"} 
      title='Nombre completo' />
      <UserData 
      Icon={IconAddressBook} 
      info={userInfo?.phone != "-" && userInfo?.phone ? userInfo.phone : "Telefono no registrado"} 
      title="Telefono" />
      <UserData 
      Icon={IconMail} 
      info={userInfo?.email ? userInfo.email : "email no registrado"} 
      title="Email" />
      <div>
        <Button onClick={handleClickButton} primary={true} size='extraLarge'> Editar Información </Button>
      </div>
    </div>
  )
}
