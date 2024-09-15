import { Layout } from '@/components/Layout'
import { GroupInput } from '@/components/ui/GroupInput'
import { onlyNumberAnyExtention } from '@/lib/validation'
import { IconUpload } from '@tabler/icons-react'
import React, { useState } from 'react'

interface InfoTypes {
  Name: string
  Price: number
  Stock: number
  Description: string
  ProductCategories: string[]
}
export const CreateProduct: React.FC = () => {
  const [thumbnailValue, setThumbnailValue] = useState<File>()
  const [ImageValue, setImageValue] = useState<File>()
  const [info, setInfo] = useState<InfoTypes>({
    Name: "",
    Price: 0,
    Stock: 0,
    Description: "",
    ProductCategories: []
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const semiPrice = e.target.value.trim()
    if(onlyNumberAnyExtention.test(semiPrice) && !isNaN(parseInt(semiPrice))){
      setInfo(prev=> ({...prev, Price: parseInt(semiPrice) }))
    }else{
      setInfo(prev => ({...prev, Price: 0}))
    }
  }
  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const semiStock = e.target.value.trim()
    if(onlyNumberAnyExtention.test(semiStock) && !isNaN(parseInt(semiStock))){
      setInfo(prev=> ({...prev, Price: parseInt(semiStock) }))
    }else{
      setInfo(prev => ({...prev, Price: 0}))
    }
  }
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight p-2 text-center flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-pretty font-oswald font-bold mb-4'>Crear nuevo producto</h1>
        <form className='w-full py-2 px-4 flex flex-col-reverse gap-2 justify-around items-center' onSubmit={handleSubmit}>
          <div className='w-full h-full flex flex-col gap- justify-center items-center'>
            <div className='w-full flex flex-row justify-center items-center gap-2'>
              <GroupInput value={info.Name} autoComplete='off' placeholder='Qiyi warrior' labelTitle='Nombre' onChange={(e)=> setInfo(prev => ({...prev, Name: e.target.value.trim()}))} />
              <GroupInput autoComplete='off' placeholder='12000' labelTitle='Precio' onChange={handleChangePrice} />
              <GroupInput autoComplete='off' placeholder='10' labelTitle='Stock disponible' onChange={handleChangeStock} />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-1'>
              <label htmlFor="Area" className='font-bold'>Descripción</label>
              <textarea placeholder='Un gran cubo para principiantes' id="Area" className='focus:border-black focus:placeholder-black p-1 resize-none h-20 w-full md:w-1/3 placeholder:text-sm outline-none border-2 px-2 py-1 rounded-sm border-slate-300 bg-slate-100'></textarea>
            </div>
          </div>
          <div className='h-full w-full flex flex-row justify-around items-start gap-2'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white  rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir miniatura
                <input onChange={(e)=> e.target.files != null ? setThumbnailValue(e.target.files[0]): console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                thumbnailValue != undefined && <img src={URL.createObjectURL(thumbnailValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 ' />
              }  
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir Imagen
                <input onChange={(e)=> e.target.files != null ? setImageValue(e.target.files[0]): console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                ImageValue != undefined && <img src={URL.createObjectURL(ImageValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 object-cover' />
              }  
            </div>
          </div>
        </form>
      </main>
    </Layout>
  )
}
