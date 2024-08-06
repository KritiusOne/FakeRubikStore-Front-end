import React, { useState } from 'react'
import { Button } from './ui/Button'
import { useURLStorage } from '@/zustand/URLStorage'
import { GroupInput } from './ui/GroupInput'
import { emailRegEx, nameRegEx, passwordRegEx, onlyNumbersRegEx } from '@/lib/validation'
import { UserUpdateBaseInfo } from '@/types/UserTypes'
import { useUserSesion } from '@/zustand/UserStorage'
import { useNavigate } from 'react-router-dom'
import { ResponseWithToken } from '@/types/ResponseTypes'
import { PRIVATE_USER_ROUTES } from '@/routes/TypesRoutes'

interface Props {
  Id?: string
  first_name?: string
  last_name?: string
  actualPhone?: string
  actualEmail?: string
}

export const UpdateInfoUser: React.FC<Props> = ({ Id, first_name, actualEmail, last_name, actualPhone }) => {
  const UpdateUser = useURLStorage(Storage => Storage.UpdateUser)
  const userStorage = useUserSesion()
  const [name, setName] = useState(first_name)
  const [lastName, setLastName] = useState(last_name)
  const [phone, setPhone] = useState(actualPhone)
  const [email, setEmail] = useState(actualEmail)
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [error, setError] = useState("")
  const navegate = useNavigate()

  const handleClickUpdateUser = async () => {
    try {
      if (Id != null && name && lastName && phone && email) {
        if (!nameRegEx.test(name.trim())) {
          setError("El nombre es invalido, elimine numeros, simbolos y otros caracteres")
          return
        }
        if (!nameRegEx.test(lastName.trim())) {
          setError("El apellido es invalido, elimine numeros, simbolos y otros caracteres")
          return
        }
        if (!emailRegEx.test(email.trim())) {
          setError("El correo no tiene el formato correcto.")
          return
        }
        if (!onlyNumbersRegEx.test(phone.trim())) {
          setError("El telefono contiene caracteres no validos")
          return
        }
        if (!passwordRegEx.test(password) || !passwordRegEx.test(secondPassword)) {
          if (password == "" && password == secondPassword) {
            setError("")
          } else {
            setError("Verifique que las contraseñas sean validas e iguales. La contraseña debe tener al menos 1 numero, una letra minuscula y mayuscula, debe constar de al menos 8 caracteres y puede opcionalmente incluir los siguientes simbolos: !@#$%^&*()_+=-")
            return
          }
        }
        setError("")
        const URL = UpdateUser(Id)
        const forBody: UserUpdateBaseInfo = {
          name: name.trim(),
          secondName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          password: password.trim()
        }
        const res = await fetch(URL, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${userStorage.typetoken} ${userStorage.token}`
          },
          body: JSON.stringify(forBody)
        })
        if(res.ok){
          const response: ResponseWithToken = await res.json()
          userStorage.setUser(response.response, response.typeToken)
          console.log(response.msg)
          navegate(PRIVATE_USER_ROUTES.PROFILE_CONFIG)
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <h1 className='text-xl text-pretty font-bold capitalize'> Ingrese sus nuevos datos </h1>
      <span className='font-thin text-sm text-balance text-center'>Si no desea Actualizar alguno de sus datos, no lo modifique. El sistema lo mantendrá automaticamente</span>
      <GroupInput value={name} onChange={(e) => setName(e.currentTarget.value)} labelTitle='Ingrese su nombre' placeholder='John' />
      <GroupInput value={lastName} onChange={(e) => setLastName(e.currentTarget.value)} labelTitle='Ingrese su apellido' placeholder='Doe' />
      <GroupInput value={phone} onChange={(e) => setPhone(e.currentTarget.value)} autoComplete='off' labelTitle='Ingrese su telefono' placeholder='123456790' />
      <GroupInput value={email} onChange={(e) => setEmail(e.currentTarget.value)} labelTitle='Ingrese su Email' placeholder='john@example.com' />
      <GroupInput value={password} onChange={(e) => setPassword(e.currentTarget.value.trim().trim())} labelTitle='Ingrese su Contraseña' placeholder='***' type='password' autoComplete='off' />
      <GroupInput value={secondPassword} onChange={(e) => setSecondPassword(e.currentTarget.value.trim())} labelTitle='Verifique su contraseña' placeholder='***' type='password' autoComplete='off' />

      <Button onClick={() => handleClickUpdateUser()} primary={true} size='extraLarge'>Actualizar datos</Button>
      {
        error != "" && <span className='text-xl text-red-600'> {error} </span>
      }
    </>
  )
}
