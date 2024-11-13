import { FiltersSearchProducts } from '@/components/FiltersSearchProducts'
import { Layout } from '@/components/Layout'
import React from 'react'

export const SearchProduct: React.FC = () => {
  return (
    <Layout className='flex justify-center items-center'>
      <div className='w-full h-full my-5 px-4 py-2 flex flex-row justify-between items-start bg-bgLight'>
        <aside className='flex flex-col justify-center items-start gap-2 px-2 py-1'>
          <FiltersSearchProducts />
        </aside>
        <main className='flex flex-col flex-1 justify-center items-center px-4 py-2 gap-2'>
          <h1 className='text-3xl font-bold text-pretty font-oswald'>Resultados de busqueda</h1>
        </main>
      </div>
    </Layout>
  )
}
