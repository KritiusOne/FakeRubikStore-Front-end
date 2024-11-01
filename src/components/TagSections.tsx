import React, { HTMLAttributes, useEffect, useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'
import { useProductStorage } from '@/zustand/ProductStorage'
import { useURLStorage } from '@/zustand/URLStorage'
import { IconLockOff, IconMinus, IconPlus } from '@tabler/icons-react'
import { RouteImage } from '@/lib/CreateRouteImage'
import { AllDataProduct, Category, CreateProductTag, ProductCategories } from '@/types/ProductsTypes'
import { useUserSesion } from '@/zustand/UserStorage'
import { Dialog } from './ui/Dialog'
import { Spinner } from './ui/Spinner'
import { PaginatedResponse, ResponseBase } from '@/types/ResponseTypes'
import { Badge } from './Badge'

function checkAddedTag(tags: Category[], ProductsTag: ProductCategories[]){
  const filteredTags = tags.filter(tag => ProductsTag.find(pc => pc.idCategory == tag.id))
  return !(filteredTags.length > 0)
}

interface Props extends HTMLAttributes<HTMLDivElement> { }
const TransformProductsIds = (ProductsIds: number[]) => {
  const aux = ProductsIds.map(id => {
    return {
      idProduct: id
    }
  })
  return aux
}


export const CreateTag: React.FC<Props> = ({ ...props }) => {
  const { AllProducts, getProducts } = useProductStorage()
  const { Products, CreateTag } = useURLStorage()
  const [ProductsIds, setProductsIds] = useState<number[]>([])
  const [newTag, setNewTag] = useState("")
  const [msg, setMsg] = useState("")
  const [showDialog, setShowDialog] = useState(false)
  const { typetoken, token } = useUserSesion()
  const [load, setLoad] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams()
    params.append("PageSize", "100")
    params.append("PageNumber", "1")
    getProducts(Products + params.toString())
  }, [])
  const handleClickAdd = (IdProduct: number) => {
    if (ProductsIds.includes(IdProduct)) return
    setProductsIds(prev => [...prev, IdProduct])
  }
  const handleClickDelete = (IdProduct: number) => {
    if (!ProductsIds.includes(IdProduct)) return
    const aux = ProductsIds.filter(id => id != IdProduct)
    setProductsIds(aux)
  }
  const handleCreate = async () => {
    if (newTag == "") {
      setMsg("No haz ingresado el nombre del tag")
      return
    }
    setMsg("")
    const body: CreateProductTag = {
      name: newTag,
      productCategories: TransformProductsIds(ProductsIds)
    }
    try {
      setShowDialog(true)
      setLoad(true)
      const res = await fetch(CreateTag, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `${typetoken} ${token}`,
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        setMsg("Se ha creado el Tag correctamente")
        setNewTag("")
        setProductsIds([])
        setLoad(false)
      }
    } catch (error) {
      console.log(error)
      setLoad(false)
      setMsg("Ha ocurrido un error")
    }
  }
  return (
    <div {...props} className={`w-full flex flex-col justify-center items-center px-2 py-4 gap-2`}>
      <h2 className='text-3xl font-bold font-oswald'>Crear nuevo tag</h2>
      <Input value={newTag} placeholder='3x3' onChange={(e) => setNewTag(e.currentTarget.value.toUpperCase())} />
      <div className=''>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            AllProducts.map(product => <article className='select-none w-40 max-h-72 border border-solid border-black flex flex-col justify-center ' key={product.id}>
              <section className='w-full h-3/5'>
                <img src={RouteImage(product.thumbnail)} className='w-full h-full' alt={`imagen de ${product.name}`} />
              </section>
              <main className='w-full h-full flex flex-col justify-center items-center px-2 py-1'>
                <h6 className='text-pretty'> {product.name} </h6>
                {
                  !ProductsIds.includes(product.id) ? (
                    <span onClick={() => handleClickAdd(product.id)} className='bg-green rounded-xl cursor-pointer select-none transition-all ease-in-out hover:opacity-65'>
                      <IconPlus className='text-white font-bold' />
                    </span>
                  ) : (
                    <span onClick={() => handleClickDelete(product.id)} className='bg-red-700 rounded-xl cursor-pointer select-none transition-all ease-in-out hover:opacity-65'>
                      <IconMinus className='text-white font-bold' />
                    </span>
                  )
                }
              </main>
            </article>)
          }
        </div>
      </div>
      <Button onClick={() => handleCreate()} primary size='extraLarge'>Crear nuevo tag</Button>
      {
        !showDialog && msg != "" && <span> {msg} </span>
      }
      {
        showDialog && (<Dialog onClose={() => load ? console.log("Aun no se puede") : setShowDialog(false)}>
          <div className='w-full bg-bgLight flex flex-col justify-center items-center gap-2 px-2 py-4'>
            <h2 className='text-3xl font-bold pretty text-center'> {msg} </h2>
            {
              showDialog && load && <Spinner colorSpinner='blue' />
            }
          </div>
        </Dialog>)
      }
    </div>
  )
}

export const AsignateTag: React.FC = () => {
  const [tags, setTags] = useState<Category[]>([])
  const [load, setLoad] = useState(false)
  const { GetAllTags, GetAllInfoProducts, CreatePC } = useURLStorage()
  const [selectedTags, setSelectedTags] = useState<Category[]>([])
  const [selectedProducts, setSelectedProducts] = useState<AllDataProduct[]>([])
  const [products, setProducts] = useState<PaginatedResponse<AllDataProduct[]>>()
  const [showDialog, setShowDialog] = useState(false)
  const [msg, setMsg] = useState("")
  //const {token, typetoken} = useUserSesion()
  useEffect(() => {
    const getTags = async () => {
      if (tags.length !== 0) return
      try {
        setLoad(true)
        const res = await fetch(GetAllTags)
        if (res.ok) {
          const response: ResponseBase<Category[]> = await res.json()
          console.log(response.msg)
          setTags(response.response)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
      }
    }
    const getProducts = async () => {
      if (tags.length !== 0) return
      try {
        setLoad(true)
        const params = new URLSearchParams()
        params.append("PageSize", "100")
        const res = await fetch(GetAllInfoProducts + "?" + params.toString())
        if (res.ok) {
          const response: PaginatedResponse<AllDataProduct[]> = await res.json()
          console.log(response.msg)
          setProducts(response)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoad(false)
      }
    }
    getTags()
    getProducts()
  }, [])
  const handleClickAddTag = (Tag: Category) => {
    const filteredTags = selectedTags.filter(tag => tag.id === Tag.id)
    if (filteredTags.length !== 0) return
    setSelectedTags([...selectedTags, Tag])
    const newGroupTags = tags.filter(tag => tag.id !== Tag.id)
    setTags(newGroupTags)
  }
  const handleClickAddProduct = (newProduct: AllDataProduct) => {
    if (products == undefined) return
    if(!checkAddedTag(selectedTags, newProduct.productCategories)) return
    const filteredProd = selectedProducts.filter(product => product.id === newProduct.id)
    if (filteredProd.length !== 0) return
    setSelectedProducts([...selectedProducts, newProduct])
    const newProducts = products.response.filter(product => product.id !== newProduct.id)
    setProducts({
      ...products, response: newProducts
    })
  }
  const handleDeleteTag = (Tag: Category) => {
    const filteredTag = selectedTags.filter(tag => tag.id === Tag.id)
    if (filteredTag.length === 0) return
    const newSelecteds = selectedTags.filter(tag => tag.id !== Tag.id)
    setSelectedTags(newSelecteds)
    setTags([...tags, Tag])
  }
  const handleDeleteProduct = (productToDelete: AllDataProduct) => {
    if (products == undefined) return
    const filteredProd = selectedProducts.filter(prod => prod.id === productToDelete.id)
    if (filteredProd.length === 0) return
    const newSelecteds = selectedProducts.filter(prod => prod.id !== productToDelete.id)
    setSelectedProducts(newSelecteds)
    setProducts({
      ...products,
      response: [...products.response, productToDelete].sort((a, b)=> a.id - b.id  )
    })
  }
  const handleCreatePC = async()=>{
    if(selectedProducts.length == 0) return 
    if(selectedTags.length == 0) return
    setShowDialog(true)
    setLoad(true)
    const toCreatePC:ProductCategories[] = []
    selectedProducts.forEach(productSelected => {
      selectedTags.forEach(selectedTag => toCreatePC.push({idProduct: productSelected.id, idCategory: selectedTag.id}))      
    });
    try {
      const response = await fetch(CreatePC, {
        method: "POST",
        body: `"categoryProductDTOs": ${JSON.stringify(toCreatePC)}`,/*
        headers: {
          Authorization: `${typetoken} ${token}`
        }*/
      })
      if(response.ok){
        const textMsg = await response.text()
        setMsg(textMsg)
      }else{
        setMsg("Hubo un error, intente otra vez en otro momento")
      }
    } catch (error) {
      setMsg("Hubo un error. Intente otra vez en otro momento")
      console.log(error)
    }finally{
      setLoad(false)
    }
  }
  return (
    <div className='w-full h-full flex flex-col justify-center items-center px-2 py-4 gap-2'>
      <div className='w-full flex flex-col justify-center items-center gap-2 px-2'>
        <h2 className='text-3xl font-bold text-pretty text-center font-oswald'>Seleccione las tags a añadir</h2>
        <div className='w-full flex flex-row flex-wrap justify-center items-center gap-2'>
          {
            !load && tags.length > 0 && tags.map(tag => <Badge className='cursor-pointer select-none' onClick={() => handleClickAddTag(tag)} title={tag.name} key={tag.id} />)
          }
          {
            load && tags.length == 0  && <Spinner />
          }
        </div>
      </div>
      {
        (products == null || load) && (<div className='flex flex-col justify-center items-center w-full'><Spinner /></div>)
      }
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-center'>
        {
          products != null && !load && products.response.map(product => <article className='select-none w-40 max-h-72 border border-solid border-black flex flex-col justify-center ' key={product.id}>
            <section className='w-full h-3/5'>
              <img src={RouteImage(product.thumbnail)} className='w-full h-full' alt={`imagen de ${product.name}`} />
            </section>
            <main className='w-full h-full flex flex-col justify-center items-center px-2 py-1'>
              <h6 className='text-pretty'> {product.name} </h6>
              <span onClick={() => handleClickAddProduct(product)}  className={`${checkAddedTag(selectedTags, product.productCategories) ? "bg-green cursor-pointer hover:opacity-65" : "bg-black cursor-not-allowed"} rounded-xl  select-none transition-all ease-in-out p-1`}>
                {
                  checkAddedTag(selectedTags, product.productCategories) ? <IconPlus className='text-white font-bold' /> : <IconLockOff className='text-white font-bold' />
                }
              </span>
            </main>
          </article>)
        }
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-2 px-2 py-4'>
        <h2 className='text-3xl font-bold text-pretty text-center font-oswald'>Se le añadirán las siguientes tags a los siguientes productos</h2>
        <div className='w-full flex flex-row flex-wrap justify-center items-center gap-2 px-2 py-4'>
          {
            selectedTags.map(tag => <Badge onClick={() => handleDeleteTag(tag)} title={tag.name} key={tag.id} />)
          }
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {
            selectedProducts.map(product => <article className='select-none w-40 max-h-72 border border-solid border-black flex flex-col justify-center ' key={product.id}>
              <section className='w-full h-3/5'>
                <img src={RouteImage(product.thumbnail)} className='w-full h-full' alt={`imagen de ${product.name}`} />
              </section>
              <main className='w-full h-full flex flex-col justify-center items-center px-2 py-1'>
                <h6 className='text-pretty'> {product.name} </h6>
                <span onClick={() => handleDeleteProduct(product)} className='bg-red-700 rounded-xl cursor-pointer select-none transition-all ease-in-out hover:opacity-65'>
                  <IconMinus className='text-white font-bold' />
                </span>
              </main>
            </article>)
          }
        </div>
      </div>
      {
        showDialog && <Dialog onClose={()=> !load ? setShowDialog(false) : setShowDialog(true)}>
          <div className='w-full h-full bg-bgLight flex flex-col justify-center items-center p-4'>
            {
              showDialog && load && <Spinner />
            }

            {
              showDialog && !load && (<>
              <h2 className='text-2xl text-pretty text-center'> {msg} </h2>
              <strong className='text-lg'>El proceso a terminado</strong>
              </>
              )
            }
          </div>
        </Dialog>
      }
      <Button onClick={()=> handleCreatePC()} primary size='extraLarge'> Agregar tags </Button>
    </div>
  )
}
