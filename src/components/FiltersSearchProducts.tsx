import React from 'react'
import { Slider } from './ui/Slider'
import { useProductStorage } from '@/zustand/ProductStorage'

export const FiltersSearchProducts: React.FC = () => {
  const {MinPriceValue, setMinPrice, MaxPriceValue, setMaxPrice} = useProductStorage()
  return (
    <>
    <div className='flex flex-col justify-center items-center p-1 gap-2'>
      <strong className='text-xl font-mono text-pretty'>Precio minimo</strong>
      <Slider max={100000} min={0} value={MinPriceValue} onChange={(e)=> setMinPrice(Number(e.currentTarget.value))} />
      <span className='text-lg font-normal text-balance'> {MinPriceValue} </span>
    </div>
    <div className='flex flex-col justify-center items-center p-1 gap-2'>
      <strong className='text-xl font-mono text-pretty'>Precio maximo</strong>
      <Slider max={250000} min={101000} value={MaxPriceValue} onChange={(e)=> setMaxPrice(Number(e.currentTarget.value))} />
      <span className='text-lg font-normal text-balance'> {MaxPriceValue} </span>
    </div>
    </>
  )
}
