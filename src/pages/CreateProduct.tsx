import { Layout } from '@/components/Layout'
import { Dialog } from '@/components/ui/Dialog'
import { GroupInput } from '@/components/ui/GroupInput'
import { Spinner } from '@/components/ui/Spinner'
import { onlyNumberAnyExtention } from '@/lib/validation'
import { PRIVATE_ADMIN_ROUTES } from '@/routes/TypesRoutes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import { IconUpload } from '@tabler/icons-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface InfoTypes {
  Name: string
  Price: number
  Stock: number
  Description: string
  Image: string
  Thumbnail: string
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
    Image: "",
    Thumbnail: "",
    ProductCategories: []
  })
  const [showError, setShowError] = useState({
    errorPrice: "",
    errorStock: "",
    allError: false
  })
  const { CreateProduct } = useURLStorage()
  const { typetoken, token } = useUserSesion()
  const [showModal, setShowModal] = useState(false)
  const navegate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!showError.allError && info.Stock > 0 && info.Price > 0 && thumbnailValue != undefined && ImageValue != undefined && info.Description != "") {
      const data = new FormData()
      data.append("InfoProduct.Name", info.Name)
      data.append("InfoProduct.Stock", info.Stock.toString());
      data.append("InfoProduct.Price", info.Price.toString());
      data.append("InfoProduct.Description", info.Description);
      data.append("InfoProduct.Image", "algo");
      data.append("InfoProduct.Thumbnail", "alog");
      data.append("InfoProduct.ProductCategories", "");
      data.append("ThumbnailImage", thumbnailValue)
      data.append("ProductImage", ImageValue)
      try {
        const res = await fetch(CreateProduct, {
          method: "POST",
          body: data,
          headers: {
            Authorization: typetoken + " " + token
          }
        })
        if (res.ok) {
          setShowModal(true)
          setTimeout(()=> navegate(PRIVATE_ADMIN_ROUTES.CONTROL_PANEL), 3000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const semiPrice = e.target.value.trim()
    if (onlyNumberAnyExtention.test(semiPrice) && !isNaN(parseInt(semiPrice))) {
      setInfo(prev => ({ ...prev, Price: parseInt(semiPrice) }))
      setShowError(prev => ({ ...prev, errorPrice: "", allError: prev.errorStock != "" }))
    } else {
      setInfo(prev => ({ ...prev, Price: 0 }))
      setShowError(prev => ({ ...prev, errorPrice: "El precio contiene caracteres no validos", allError: true }))
    }
  }
  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const semiStock = e.target.value.trim()
    if (onlyNumberAnyExtention.test(semiStock) && !isNaN(parseInt(semiStock))) {
      setInfo(prev => ({ ...prev, Stock: parseInt(semiStock) }))
      setShowError(prev => ({ ...prev, errorStock: "", allError: prev.errorPrice != "" }))
    } else {
      setInfo(prev => ({ ...prev, Price: 0 }))
      setShowError(prev => ({ ...prev, errorStock: "El Stock contiene caracteres no validos", allError: true }))
    }
  }
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight p-2 text-center flex flex-col justify-center items-center'>
        <h1 className='text-3xl text-pretty font-oswald font-bold mb-4'>Crear nuevo producto</h1>
        <form className='w-full py-2 px-4 flex flex-col gap-2 justify-around items-center mb-4' onSubmit={handleSubmit}>
          <div className='h-full w-full flex flex-col md:flex-row justify-around items-center md:items-start gap-2'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white  rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir miniatura
                <input  accept='image/*'  onChange={(e) => e.target.files != null ? setThumbnailValue(e.target.files[0]) : console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                thumbnailValue != undefined && <img src={URL.createObjectURL(thumbnailValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 ' />
              }
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir Imagen
                <input  accept='image/*'  onChange={(e) => e.target.files != null ? setImageValue(e.target.files[0]) : console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                ImageValue != undefined && <img src={URL.createObjectURL(ImageValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 object-cover' />
              }
            </div>
          </div>
          <div className='w-full h-full flex flex-col gap- justify-center items-center'>
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
              <GroupInput value={info.Name} autoComplete='off' placeholder='Qiyi warrior' labelTitle='Nombre' onChange={(e) => setInfo(prev => ({ ...prev, Name: e.target.value.trim() }))} />
              <GroupInput autoComplete='off' placeholder='12000' labelTitle='Precio' onChange={handleChangePrice} />
              <GroupInput autoComplete='off' placeholder='10' labelTitle='Stock disponible' onChange={handleChangeStock} />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-1'>
              <label htmlFor="Area" className='font-bold'>Descripción</label>
              <textarea value={info.Description} onChange={(e) => setInfo(prev => ({ ...prev, Description: e.target.value.trim() }))} placeholder='Un gran cubo para principiantes' id="Area" className='focus:border-black focus:placeholder-black p-1 resize-none h-20 w-full md:w-1/3 placeholder:text-sm outline-none border-2 px-2 py-1 rounded-sm border-slate-300 bg-slate-100'></textarea>
            </div>
          </div>
          <input className='bg-primaryRed px-2 py-1 text-white rounded cursor-pointer hover:bg-tomato' type='submit' value="Crear Producto" />
        </form>
        {
          showError.errorPrice != "" && <strong className='text-xl text-primaryRed'> {showError.errorPrice} </strong>
        }
        {
          showError.errorStock != "" && <strong className='text-xl text-primaryRed'> {showError.errorStock} </strong>
        }
        {
          showModal && (
            <Dialog onClose={() => setShowModal(false)}>
              <div className='w-full h-full bg-bgLight flex flex-col justify-center items-center gap-2 py-2'>
                <h2 className='text-3xl text-pretty font-oswald font-bold mb-4'>Tu producto se a creado correctamente</h2>
                <strong className='text-xl text-balance'>Serás redireccionado en un momento</strong>
                <Spinner />
              </div>
            </Dialog>
          )
        }
      </main>
    </Layout>
  )
}
