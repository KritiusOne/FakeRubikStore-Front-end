import React from 'react'
import { UserData } from './ui/UserData'
import { useUserSesion } from '@/zustand/UserStorage'
import { IconAddressBook, IconMail, IconUser } from '@tabler/icons-react'
import { Button } from './ui/Button'

interface Props {

}
export const UserInfo: React.FC<Props> = () => {
  const userInfo = useUserSesion(Storage => Storage.infoUser)
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
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
        <Button primary={true} size='extraLarge'> Editar Información </Button>
      </div>
    </div>
  )
}
