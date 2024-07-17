import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import cover from "@/assets/cover-login-2.avif"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"

export const SingIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")

  return (
    <Layout className="w-full flex flex-col justify-between items-center text-bgLight">
      <main className="flex flex-row w-full justify-between items-center">
        <div className="w-full h-full flex flex-col justify-center items-center px-6 py-8 gap-2">
          <div className="flex flex-col justify-center items-start gap-0.5 w-3/4">
            <h2 className='text-4xl text-center text-bgLight'>Registrarse</h2>
            <Label>Ingrese su informacion</Label>
          </div>
          <form className="flex flex-col justify-center items-center w-full gap-2">
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label htmlFor="name"> Nombre </Label>
              <Input id="name" stateData="normal" value={name} onChange={(e) => setName(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" placeholder="Jonh" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Apellido </Label>
              <Input stateData="normal" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Correo Electronico </Label>
              <Input stateData="normal" placeholder="mail@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Contraseña </Label>
              <Input stateData="normal" placeholder="min 8 caracteres" value={password} onChange={(e) => setPassword(e.target.value)}type="password" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label> Confirmar contraseña </Label>
              <Input stateData="normal" placeholder="min 8 caracteres" value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
            </div>
            <Button size="extraLarge" primary={true} onClick={() => console.log("SI PRESIONE")}> <span>Registrarse</span> </Button>
          </form>
        </div>
        <aside className="h-full">
          <img src={cover} alt="Imagen de portada megaminx" className="hidden md:block w-full coverImgSignIn object-fill" />
        </aside>
      </main>
    </Layout>
  )
}