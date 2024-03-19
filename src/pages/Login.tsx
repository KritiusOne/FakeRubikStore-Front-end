import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { PUBLIC_ROUTES } from "@/routes/TypesRoutes"
import { MouseEvent, useState } from "react"
import { Link } from "react-router-dom"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const handleClck = (e: MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    async function getInfo (){
      const sendData = JSON.stringify({
        email: email,
        password: password
      })
      console.log(sendData)
      try {
        const response = await fetch("https://localhost:7220/api/Login",{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: sendData
        })
        const res = await response.json();
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo()
  }

  return (
    <Layout className="w-full flex flex-col justify-center items-center gap-10" >
        <h2 className='text-4xl text-center text-bgLight'>Iniciar sesión</h2>
        <form className='flex flex-col gap-10 text-bgLight mt-5'>
          <div className="w-full text-left flex flex-row justify-start items-center gap-4">
            <label className="text-xl"> Correo Electronico </label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" />
          </div>
          <div className="w-full text-left flex flex-row justify-start items-center gap-4">
            <label className="text-xl"> Contraseña </label>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
          </div>
          <Button onClick={handleClck} className='bg-tomato outline-none hover:bg-green' title="Iniciar sesion" />
          <Link className='bg-tomato outline-none hover:bg-green text-center' to={PUBLIC_ROUTES.SINGIN}> Registrarse </Link>
        </form>
    </Layout>
  )
}