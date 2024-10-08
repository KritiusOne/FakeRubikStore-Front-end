import { Badge } from '@/components/Badge'
import { Layout } from '@/components/Layout'
import { Dialog } from '@/components/ui/Dialog'
import { Divider } from '@/components/ui/Divider'
import { GroupInput } from '@/components/ui/GroupInput'
import { Spinner } from '@/components/ui/Spinner'
import { RouteImage } from '@/lib/CreateRouteImage'
import { onlyNumberAnyExtention } from '@/lib/validation'
import { PRIVATE_ADMIN_ROUTES } from '@/routes/TypesRoutes'
import { AllDataProduct } from '@/types/ProductsTypes'
import { ResponseBase } from '@/types/ResponseTypes'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'
import { IconUpload } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface InfoTypes {
  Name: string
  Price: number
  Stock: number
  Description: string
  Image: string
  Thumbnail: string
  ProductCategories: string[]
}
export const EditProduct: React.FC = () => {
  const location = useLocation()
  const [InfoProduct, setInfoProduct] = useState<AllDataProduct>()
  const [load, setLoad] = useState(false)
  const { GetProductByID } = useURLStorage()
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
  const { UpdateProduct } = useURLStorage()
  const { token, typetoken } = useUserSesion()
  const navegate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [editedTag, setEditedTag] = useState("")

  useEffect(() => {
    const getActualProduct = async () => {
      const paramsSplited = location.search.split("=")
      if (!isNaN(parseInt(paramsSplited[1]))) {
        const id = parseInt(paramsSplited[1])
        const FINAL_URL = GetProductByID + id
        setLoad(true)
        try {
          const res = await fetch(FINAL_URL)
          if (res.ok) {
            const response: ResponseBase<AllDataProduct> = await res.json()
            setInfoProduct(response.response)
            setInfo({
              Description: response.response.description,
              Image: response.response.image,
              Name: response.response.name,
              Price: response.response.price,
              ProductCategories: response.response.productCategories,
              Stock: response.response.stock,
              Thumbnail: response.response.thumbnail
            })
            setLoad(false)
          }

        } catch (error) {
          console.log(error)
        }
      }
    }
    getActualProduct()
  }, [])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!showError.allError && info.Stock > 0 && info.Price > 0 && thumbnailValue != undefined && ImageValue != undefined && info.Description != "" && InfoProduct != undefined) {
      const data = new FormData()
      data.append("InfoProduct.InfoProduct.Id", InfoProduct.id.toString())
      data.append("InfoProduct.InfoProduct.Name", info.Name)
      data.append("InfoProduct.InfoProduct.Price", info.Price.toString())
      data.append("InfoProduct.InfoProduct.Stock", info.Stock.toString());
      data.append("InfoProduct.InfoProduct.Image", "algo");
      data.append("InfoProduct.InfoProduct.Description", info.Description)
      data.append("InfoProduct.InfoProduct.Thumbnail", "alog");
      data.append("InfoProduct.ThumbnailImage", ImageValue)
      data.append("InfoProduct.ProductImage", thumbnailValue)
      try {
        const res = await fetch(UpdateProduct, {
          method: "PUT",
          body: data,
          headers: {
            Authorization: typetoken + " " + token
          }
        })
        if (res.ok) {
          setShowModal(true)
          setTimeout(() => navegate(PRIVATE_ADMIN_ROUTES.CONTROL_PANEL), 3000)
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
    } else if (semiPrice == "") {
      setInfo(prev => ({ ...prev, Price: 0 }))
      setShowError(prev => ({ ...prev, errorPrice: "", allError: prev.errorStock != "" }))
    } else {
      setInfo(prev => ({ ...prev, Price: 0 }))
      setShowError(prev => ({ ...prev, errorPrice: "El precio contiene caracteres no validos", allError: true }))
    }
  }
  const handleChangeStock = (e: React.ChangeEvent<HTMLInputElement>) => {
    const semiStock = e.target.value.trim()
    if (!isNaN(parseInt(semiStock))) {
      setInfo(prev => ({ ...prev, Stock: parseInt(semiStock) }))
      setShowError(prev => ({ ...prev, errorStock: "", allError: prev.errorPrice != "" }))
    } else if (semiStock == "") {
      setInfo(prev => ({ ...prev, Stock: 0 }))
      setShowError(prev => ({ ...prev, errorStock: "", allError: prev.errorPrice != "" }))
    } else {
      setInfo(prev => ({ ...prev, Price: 0 }))
      setShowError(prev => ({ ...prev, errorStock: "El Stock contiene caracteres no validos", allError: true }))
    }
  }
  const handleAddTags = (e: React.KeyboardEvent)=>{
    if(e.key == "Enter"){
      setInfo(prev =>({...prev, ProductCategories: [...prev.ProductCategories, editedTag.toUpperCase()]}))
      setEditedTag("")
    }
  }
  return (
    <Layout>
      <main className='w-full h-full bg-bgLight my-10 p-2 flex flex-col justify-center items-center'>
        {
          load && <Spinner colorSpinner='Dark' />
        }
        {
          !load && InfoProduct != undefined && (
            <div className="flex flex-col md:grid md:grid-cols-3 justify-center items-center lg:min-w-[800px] max-w-full px-6 py-4 text-bgDark mx-6 rounded-md">
              <section>
                <img src={RouteImage(InfoProduct.image)} alt={`Imagen del ${InfoProduct.name}`} />
              </section>
              <section className="flex flex-col justify-center items-center px-4 text-center mt-4 md:mt-0">
                <h1 className="text-3xl w-full"> {InfoProduct.name} </h1>
                <strong className="text-xl"> {InfoProduct.price} </strong>

              </section>
              <section className="flex flex-col justify-center items-center gap-4">
                <span className='text-xl font-semibold'>Stock disponible: {InfoProduct.stock} </span>
                <p className="text-balance">
                  {InfoProduct.description}
                </p>
              </section>
            </div>
          )
        }
        <Divider />
        <form className='w-full py-2 px-4 flex flex-col gap-2 justify-around items-center mb-4' onSubmit={handleSubmit}>
          <div className='h-full w-full flex flex-col md:flex-row justify-around items-center md:items-start gap-2'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white  rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir miniatura
                <input accept='image/*' onChange={(e) => e.target.files != null ? setThumbnailValue(e.target.files[0]) : console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                thumbnailValue != undefined && <img src={URL.createObjectURL(thumbnailValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 ' />
              }
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
              <label className="flex flex-row gap-0.5 justify-center items-center bg-primaryRed px-2 py-1 text-white rounded cursor-pointer hover:bg-tomato" >
                <IconUpload /> Subir Imagen
                <input accept='image/*' onChange={(e) => e.target.files != null ? setImageValue(e.target.files[0]) : console.log("accion cancelada")} className="hidden w-full h-full" type="file"></input>
              </label>
              {
                ImageValue != undefined && <img src={URL.createObjectURL(ImageValue)} alt="Miniatura del nuevo objeto" className='max-w-80 max-h-80 object-cover' />
              }
            </div>
          </div>
          <div className='w-full h-full flex flex-col gap- justify-center items-center'>
            <div className='w-full flex flex-col md:flex-row justify-center items-center gap-2'>
              <GroupInput value={info.Name} autoComplete='off' placeholder='Qiyi warrior' labelTitle='Nombre' onChange={(e) => setInfo(prev => ({ ...prev, Name: e.target.value.trim() }))} />
              <GroupInput autoComplete='off' value={info.Price} placeholder='12000' labelTitle='Precio' onChange={handleChangePrice} />
              <GroupInput value={info.Stock} autoComplete='off' placeholder='10' labelTitle='Stock disponible' onChange={handleChangeStock} />
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-1'>
              <label htmlFor="Area" className='font-bold'>Descripción</label>
              <textarea value={info.Description} onChange={(e) => setInfo(prev => ({ ...prev, Description: e.target.value.trim() }))} placeholder='Un gran cubo para principiantes' id="Area" className='focus:border-black focus:placeholder-black p-1 resize-none h-20 w-full md:w-1/3 placeholder:text-sm outline-none border-2 px-2 py-1 rounded-sm border-slate-300 bg-slate-100'></textarea>
            </div>
            <div className='w-full flex flex-col justify-center items-center gap-1'>
              <GroupInput value={editedTag} labelTitle='Etiquetas' onKeyDown={handleAddTags} onChange={(e)=> setEditedTag(e.currentTarget.value.trim())} />
              <span> Para agregar una etiqueta, escriba el nombre y presione enter </span>
              {
                info.ProductCategories.map((tag, i)=> <Badge title={tag} key={i} />)
              }
            </div>
            
          </div>
          <input className='bg-primaryRed px-2 py-1 text-white rounded cursor-pointer hover:bg-tomato' type='submit' value="Crear Producto" />
        </form>
        {
          showModal && (
            <Dialog onClose={() => setShowModal(false)}>
              <div className='w-full h-full bg-bgLight flex flex-col justify-center items-center gap-2 py-2'>
                <h2 className='text-3xl text-pretty font-oswald font-bold mb-4'>Tu producto se a Actualizado correctamente</h2>
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