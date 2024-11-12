import { Layout } from '@/components/Layout'
import React from 'react'

export const SearchProduct: React.FC = () => {
  return (
    <Layout className='flex justify-center items-center'>
      <main className='w-full h-full my-5 px-4 py-2 flex flex-col justify-center items-center bg-bgLight'>
        <h1>Results</h1>
      </main>
    </Layout>
  )
}
