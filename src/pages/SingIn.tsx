import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import cover from "@/assets/cover-login-2.avif"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { emailRegEx, nameRegEx, passwordRegEx } from "@/lib/validation"

interface SignInField {
  value: string
  state: "success" | "error" | "normal"
}
export const SingIn: React.FC = () => {
  const [name, setName] = useState<SignInField>({
    state: "normal",
    value: ""
  })
  const [lastName, setLastName] = useState<SignInField>({
    state: "normal",
    value: ""
  })
  const [email, setEmail] = useState<SignInField>({
    state: "normal",
    value: ""
  })
  const [password, setPassword] = useState<SignInField>({
    state: "normal",
    value: ""
  })
  const [secondPassword, setSecondPassword] = useState<SignInField>({
    state: "normal",
    value: ""
  })
  
  const handleChangeNames = (e: React.ChangeEvent<HTMLInputElement>)=>{
    nameRegEx.test(e.target.value) ? setName({state: "success", value: e.target.value}) : setName({state: "error", value: e.target.value}) 
  }
  const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    nameRegEx.test(e.target.value) ? setLastName({
      state: "success",
      value: e.target.value
    }) : setLastName({
      state: "error",
      value: e.target.value
    })
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
    emailRegEx.test(e.target.value.toLowerCase()) ? setEmail({state: "success", value: e.target.value.toLocaleLowerCase()}) : setEmail({state: "error", value: e.target.value.toLocaleLowerCase()})
    console.log(e.target.value.toLowerCase())
  }
  const handleChangePasword = (e: React.ChangeEvent<HTMLInputElement>)=>{
    passwordRegEx.test(e.target.value) ? setPassword({state: "success", value: e.target.value}) : setPassword({state: "error", value: e.target.value})
  }
  
  const handleChangeSecondPasword = (e: React.ChangeEvent<HTMLInputElement>)=>{
    passwordRegEx.test(e.target.value) ? setSecondPassword({state: "success", value: e.target.value}) : setSecondPassword({state: "error", value: e.target.value})
  }
  return (
    <Layout className="w-full flex flex-col justify-between items-center text-bgLight">
      <main className="flex flex-row w-full justify-between items-center">
        <div className="w-full h-screen md:h-full flex flex-col justify-center items-center px-6 py-8 gap-2">
          <div className="flex flex-col justify-center items-start gap-0.5 w-3/4">
            <h2 className='text-4xl text-center text-bgLight'>Registrarse</h2>
            <Label>Ingrese su informacion</Label>
          </div>
          <form className="flex flex-col justify-center items-center w-full gap-2">
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label stateData={name.state} htmlFor="name"> Nombre </Label>
              <Input id="name" stateData={name.state} value={name.value} onChange={handleChangeNames} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="text" placeholder="Jonh" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label stateData={lastName.state} htmlFor="lastname"> Apellido </Label>
              <Input id="lastname" stateData={lastName.state} placeholder="Doe" value={lastName.value} onChange={handleChangeLastName} type="text" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label htmlFor="mail" stateData={email.state}> Correo Electronico </Label>
              <Input stateData={email.state} id="mail" placeholder="mail@example.com" value={email.value} onChange={handleChangeEmail} type="text" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label stateData={password.state} htmlFor="password"> Contraseña </Label>
              <Input stateData={password.state} id="password" placeholder="min 8 caracteres" value={password.value} onChange={handleChangePasword}type="password" />
            </div>
            <div className="w-3/4 text-left flex flex-col justify-center items-start gap-0.5">
              <Label htmlFor="second_password" stateData={secondPassword.state}> Confirmar contraseña </Label>
              <Input stateData={secondPassword.state} id="second_password" placeholder="min 8 caracteres" value={secondPassword.value} onChange={handleChangeSecondPasword} className='w-full outline-none rounded-3xl px-4 bg-bgLight focus:bg-white text-balck border-2 text-black' type="password" />
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