import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { User } from "@/types/UserTypes"
import { ResponseWithToken } from "@/types/ResponseTypes"
import { useURLStorage } from "@/zustand/URLStorage"
import { useUserSesion } from "@/zustand/UserStorage"
import { MouseEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const endpoint = useURLStorage(urls => urls.Login)
  const setUser = useUserSesion(userSersion => userSersion.setUser)
  const navegator = useNavigate()

  function handleClck(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const sendData = JSON.stringify({
      email: email,
      password: password,
    })
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: sendData
    }
    fetch(endpoint, options)
      .then(response => response.json()
      )
      .then((res: ResponseWithToken<User>) =>{
        localStorage.setItem("token", res.token)
        setUser(res.response)
        navegator(PUBLIC_ROUTES.HOME)
      })
      .catch(err => console.error(err));
  }
  return (
    <Layout className="w-full flex flex-col justify-center items-center gap-10" >
      <h2 className='text-4xl text-center text-bgLight'>Iniciar sesión</h2>
      <form className='flex flex-col gap-10 text-bgLight mt-5'>
        <div className="w-full text-left flex flex-row justify-start items-center gap-4">
          <label className="text-xl"> Correo Electronico </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" />
        </div>
        <div className="w-full text-left flex flex-row justify-start items-center gap-4">
          <label className="text-xl"> Contraseña </label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
        </div>
        <Button primary={true} size="extraLarge" onClick={ ()=> handleClck} className='outline-none hover:bg-green'> <span>Iniciar sesion</span> </Button>
        <Link className='bg-tomato outline-none hover:bg-green text-center' to={PUBLIC_ROUTES.SINGIN}> Registrarse </Link>
      </form>
    </Layout>
  )
}