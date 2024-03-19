import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { useState } from "react"

export const SingIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  return (
    <Layout className="w-full flex flex-col justify-center items-center gap-10 text-bgLight">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h2 className='text-4xl text-center text-bgLight mb-4'>Registrarse</h2>
        <form className="flex flex-col justify-center items-center w-full gap-4">
          <div className="w-full text-left flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="text-xl"> Nombre </label>
            <input value={name} onChange={(e) => setName(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" />
          </div>
          <div className="w-full text-left flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="text-xl"> Apellido </label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" />
          </div>
          <div className="w-full text-left flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="text-xl"> Correo Electronico </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" />
          </div>
          <div className="w-full text-left flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="text-xl"> Contraseña </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
          </div>
          <div className="w-full text-left flex flex-col md:flex-row justify-start items-center gap-4">
            <label className="text-xl"> Confirmar contraseña </label>
            <input value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
          </div>
          <Button onClick={() => console.log("SI PRESIONE")} className='bg-tomato outline-none hover:bg-green px-2 py-1 rounded-md' title="Registrarse" />
        </form>
      </div>
    </Layout>
  )
}