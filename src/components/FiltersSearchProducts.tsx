import React, { useEffect } from 'react'
import { Slider } from './ui/Slider'
import { useProductStorage } from '@/zustand/ProductStorage'
import { Spinner } from './ui/Spinner'
import { Checkbox } from './ui/Checkbox'

export const FiltersSearchProducts: React.FC = () => {
  const { MinPriceValue, setMinPrice, MaxPriceValue, setMaxPrice, ProductTags, setProductsTags, toggleProductTag } = useProductStorage()

  useEffect(()=>{
    setProductsTags()
  }, [])
  return (
    <>
      <div className='flex flex-col justify-center items-center p-1 gap-2'>
        <strong className='text-xl font-mono text-pretty'>Precio minimo</strong>
        <Slider max={100000} min={0} value={MinPriceValue} onChange={(e) => setMinPrice(Number(e.currentTarget.value))} />
        <span className='text-lg font-normal text-balance'> {MinPriceValue} </span>
      </div>
      <div className='flex flex-col justify-center items-center p-1 gap-2'>
        <strong className='text-xl font-mono text-pretty'>Precio maximo</strong>
        <Slider max={250000} min={101000} value={MaxPriceValue} onChange={(e) => setMaxPrice(Number(e.currentTarget.value))} />
        <span className='text-lg font-normal text-balance'> {MaxPriceValue} </span>
      </div>
      <div className='flex flex-col justify-center items-center p-1 gap-2'>
        <strong className='text-xl font-mono text-pretty'>Categorias</strong>
        <div className='flex flex-col justify-center items-start gap-2'>
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
