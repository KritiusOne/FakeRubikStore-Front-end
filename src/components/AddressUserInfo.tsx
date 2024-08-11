import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import React, { useEffect, useState } from 'react'
import { UserData } from './ui/UserData'
import { IconAddressBook } from '@tabler/icons-react'
import { AddressById } from '@/types/UserTypes'
import { Spinner } from './ui/Spinner'
import { Button } from './ui/Button'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'
interface Props {

}
export const AddressUserInfo: React.FC<Props> = () => {
  const [load, setLoad] = useState(false)
  const [address, setAddress] = useState<AddressById>()
  const infoUser = useUserSesion(Storage => Storage.infoUser)
  const token = useUserSesion(Storage => Storage.token)
  const getURL = useURLStorage(Storage => Storage.GetAddressById)
  const navegate = useNavigate()
  useEffect(() => {
    const getAddressById = async () => {
      try {
        if (infoUser) {
          const GET_ADDRESS_BY_ID = getURL(infoUser.IdAddress)
          setLoad(true)
          const res = await fetch(GET_ADDRESS_BY_ID, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          if (res.ok) {
            setLoad(false)
            const AddresById: AddressById = await res.json()
            setAddress(AddresById)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    getAddressById()
  }, [])
  const handleClickButton = ()=>{
    const params = new URLSearchParams()
    params.set("id", "2")
    const routeBase = PRIVATE_USER_ROUTES.EDIT_USER_INFO.split(":")
    navegate(routeBase[0] + routeBase[1] + "?" + params.toString())
  }
  return (
    <div className='flex flex-col justify-center items-center gap-2 px-2 py-4'>
      {
        load && <Spinner colorSpinner='red' />
      }
      {
        address != undefined && (
          <>
            <UserData
              Icon={IconAddressBook}
              info={address.address == null ? "No conocemos tu dirección" : address.address}
              title='Dirrección' />
            <UserData
              Icon={IconAddressBook}
              info={address.city == null ? "No conocemos tu ciudad" : address.city}
              title='Ciudad' />
            <UserData
              Icon={IconAddressBook}
              info={address.state == null ? "No conocemos tu Departamento/Estado" : address.state}
              title='Departamento/Estado' />
            <UserData
              Icon={IconAddressBook}
              info={address.country == null ? "No conocemos tu País" : address.country}
              title='País' />
              <Button size='extraLarge' onClick={handleClickButton} primary={true}> Editar información</Button>
          </>
        )
      }
    </div>
  )
}
