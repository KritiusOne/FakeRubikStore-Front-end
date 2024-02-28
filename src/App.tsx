import {  MouseEvent, useState } from 'react'
import './App.css'
import { Layout } from './components/Layout'

function App() {
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
    <Layout>
      <h1 className='text-4xl mb-32'>Login de prueba</h1>
      <form className='flex flex-col max-w-60 gap-10 text-black'>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} className='outline-none border-none' type="text" />
        <input value={password} onChange={(e)=> setPassword(e.target.value)} className='outline-none border-none' type="text" />
        <button onClick={handleClck} className='bg-transparent outline-none text-white border-b-4 border-b-red-700 border-solid hover:bg-slate-200 hover:text-black'>Iniciar sesion</button>

      </form>
    </Layout>
  )
}

export default App
