import React from 'react'
import { Button } from './ui/Button'
import { IconPlus } from '@tabler/icons-react'

export const ProductsDashboard: React.FC = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
        <Button primary={true} size='extraLarge' className='flex-row'> <span className='flex flex-row gap-1'><IconPlus /> Agregar producto</span></Button>
      </div>
    </div>
  )
}
