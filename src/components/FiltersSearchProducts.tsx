import React, { useEffect } from 'react'
import { Slider } from './ui/Slider'
import { useProductStorage } from '@/zustand/ProductStorage'
import { Spinner } from './ui/Spinner'
import { Checkbox } from './ui/Checkbox'
import { useLocation, useNavigate } from 'react-router-dom'
import { FiltersProductsNames } from '@/lib/SearchLibrary'

export const FiltersSearchProducts: React.FC = () => {
  const { MinPriceValue, setMinPrice, MaxPriceValue, setMaxPrice, ProductTags, setProductsTags, toggleProductTag } = useProductStorage()
  const navegate = useNavigate()
  const location = useLocation()
  useEffect(()=>{
    setProductsTags()
  }, [])

  const handleMouseUpMinPrice = ()=>{
    const params = new URLSearchParams(location.search)
    params.set(FiltersProductsNames.MinPrice, MinPriceValue.toString())
    navegate(`${location.pathname}?${params.toString()}`, {replace: true})
  }
  const handleMouseUpMaxPrice = ()=>{
    const params = new URLSearchParams(location.search)
    params.set(FiltersProductsNames.MaxPrice, MaxPriceValue.toString())
    navegate(`${location.pathname}?${params.toString()}`, {replace: true})
  }
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center p-1 gap-2'>
          <strong className='text-xl font-mono text-pretty'>Precio minimo</strong>
          <Slider max={100000} min={0} 
          value={MinPriceValue} 
          onChange={(e) => setMinPrice(Number(e.currentTarget.value))} 
          onMouseUp={handleMouseUpMinPrice}
          onTouchEnd={handleMouseUpMinPrice} />
          <span className='text-lg font-normal text-balance'> {MinPriceValue} </span>
        </div>
        <div className='flex flex-col justify-center items-center p-1 gap-2'>
          <strong className='text-xl font-mono text-pretty'>Precio maximo</strong>
          <Slider max={250000} 
          min={101000} 
          value={MaxPriceValue} 
          onChange={(e) => setMaxPrice(Number(e.currentTarget.value))}
          onMouseUp={handleMouseUpMaxPrice}
          onTouchEnd={handleMouseUpMaxPrice} />
          <span className='text-lg font-normal text-balance'> {MaxPriceValue} </span>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center p-1 gap-2'>
        <strong className='text-xl font-mono text-pretty'>Categorias</strong>
        <div className='grid grid-cols-3 md:flex md:flex-col justify-center items-center gap-2'>
          {
            ProductTags.length == 0 && <Spinner colorSpinner='red' />
          } 
          {
            ProductTags.map((tag) => <div key={tag.Tag.id} className='flex flex-row w-full gap-2'>
              <Checkbox colorCheckBox='red' size='medium'  handleChangeChecked={toggleProductTag} state={tag.isSelect} id={tag.Tag.id} />
              <span> {tag.Tag.name} </span>
            </div>)
          }
        </div>     
      </div>
      
    </>
  )
}
