import React, { useId, useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { GroupInput } from './ui/GroupInput'
import { sitesRegEx } from '@/lib/validation'
import { AddressUserUpdate } from '@/types/UserTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'

interface Props {
  id: number
}
export const UpdateUserAddressInfo: React.FC<Props> = ({ id }) => {
  const hintID = useId()
  const [newAddress, setNewAddress] = useState("")
  const [newCity, setNewCity] = useState("")
  const [newState, setNewState] = useState("")
  const [newCountry, setNewCountry] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [error, setError] = useState("")
  const getURL = useURLStorage(Storage => Storage.UpdateAddress)
  const navegate = useNavigate()

  const infoToken = useUserSesion(Storage => {
    return { fixToken: Storage.typetoken, token: Storage.token }
  })
  const handleClickUpdate = async () => {
    try {
      if (!sitesRegEx.test(newAddress.trim())) {
        setError("La dirrección tiene simbolos invalidos")
        return
      }
      if (!sitesRegEx.test(newCity.trim())) {
        setError("La ciudad tiene caracteres invalidos")
        return
      }
      if (!sitesRegEx.test(newState.trim())) {
        setError("El departamento/estado contiene caracteres invalidos")
        return
      }
      if (!sitesRegEx.test(newCountry.trim())) {
        setError("El país contiene caracteres invalidos")
        return
      }
      /*
      if(!sitesRegEx.test(newDescription.trim())){
        setError("La descripción contiene caracteres invalidos. Recuerde que este es un campo opcional")
        return
      }
      */
      setError("")
      
      const update: AddressUserUpdate = {
        id: id.toString(),
        address: newAddress.trim(),
        city: newCity.trim(),
        state: newState.trim(),
        country: newCountry.trim(),
        description: newDescription.trim()
      }
      const URL = getURL(id)
      const res = await fetch(URL, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${infoToken.fixToken} ${infoToken.token}`
        },
        body: JSON.stringify(update)
      })
      if(res.ok){
        navegate(PRIVATE_USER_ROUTES.PROFILE_CONFIG)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center gap-0.5'>
        <h1 className='text-xl text-pretty font-bold capitalize'> Ingrese los datos donde desea recibir sus envíos </h1>
        <strong className="text-sm text-balance before:content-['*'] before:ml-0.5 before:text-red-500"> Campos opcionales</strong>
      </div>
      <GroupInput labelTitle='Ingrese su dirección' placeholder='Cr. 1 Calle 1 Mz 1 Barrio' autoComplete='off'
        value={newAddress}
        onChange={(e) => setNewAddress(e.currentTarget.value)} />
      <GroupInput labelTitle="Ingrese el nombre de su ciudad" placeholder='Bogotá' autoComplete='off'
        value={newCity}
        onChange={(e) => setNewCity(e.currentTarget.value)} />
      <GroupInput labelTitle='Ingrese su departamento' placeholder='Cundinamarca' autoComplete='off'
        value={newState}
        onChange={(e) => setNewState(e.currentTarget.value)} />
      <GroupInput labelTitle='Ingrese su país' placeholder='Colombia' autoComplete='off'
        value={newCountry}
        onChange={(e) => setNewCountry(e.currentTarget.value)} />
      <div className='flex flex-col justify-around items-center w-full text-left gap-1'>
        <label htmlFor={hintID} className="font-semibold text-left after:content-['*'] after:ml-0.5 after:text-red-500">Ingrese su Descripción</label>
        <Input id={hintID} placeholder='***' autoComplete='off'
          value={newDescription}
          onChange={(e) => setNewDescription(e.currentTarget.value)} />
      </div>
      <Button onClick={() => handleClickUpdate()} primary={true} size='extraLarge'>Actualizar datos</Button>
      {
        error != "" && <span className='text-xl text-red-600 uppercase'> {error} </span>
      }
    </>
  )
}
