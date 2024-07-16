import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { ResponseWithToken } from "@/types/ResponseTypes"
import { useURLStorage } from "@/zustand/URLStorage"
import { useUserSesion } from "@/zustand/UserStorage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import cover from "@/assets/cover-login-2.avif"
import { Label } from "@/components/ui/Label"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const endpoint = useURLStorage(urls => urls.Login)
  const setUser = useUserSesion(userSersion => userSersion.setUser)
  const navegator = useNavigate()
  useEffect(()=>{
    window.scroll(0, 0)
  }, [])
  function handleClck() {
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
      .then((res: ResponseWithToken) => {
        setUser(res.response, res.typetoken)
        console.log(res.msg)
        navegator(PUBLIC_ROUTES.HOME)
      })
      .catch(err => console.error(err));
  }
  return (
    <Layout className="w-full flex flex-col justify-center items-center" >
      <main className="flex flex-row w-full h-screen md:h-full">
        <section className="w-full px-10 py-6 flex flex-col justify-center items-center">
          <div className="flex flex-col gap-0.5 w-full lg:w-3/5 justify-center items-start">
            <h1 className='text-4xl text-pretty text-bgLight'>Iniciar sesión</h1>
            <Label>Inicie sesion con su cuenta</Label>
          </div>
          <form className='flex flex-col gap-2 text-bgLight w-full lg:w-3/5 mt-5'>
            <div className="w-full text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Correo Electronico </Label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" placeholder="mail@example.com" />
            </div>
            <div className="w-full text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Contraseña </Label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" placeholder="min 8 caracteres" />
            </div>
            <Button primary={true} size="extraLarge" onClick={handleClck} className='outline-none hover:bg-green'> <span>Iniciar sesion</span> </Button>
            <Link className='bg-tomato outline-none hover:bg-green text-center' to={PUBLIC_ROUTES.SINGIN}> Registrarse </Link>
          </form>
        </section>
        <aside className="">
          <img src={cover} alt="Imagen megamix " className="hidden md:block w-full  coverImg lg:object-cover object-fill" />
        </aside>
      </main>
    </Layout>
  )
}