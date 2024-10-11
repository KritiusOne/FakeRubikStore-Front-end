import { Layout } from '@/components/Layout'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import React from 'react'

export const SetTags: React.FC = () => {
  return (
    <Layout>
      <main className='w-full h-full my-10 bg-bgLight px-2 py-4'>
        <h1>Crear nueva etiqueta</h1>
        <Input placeholder='3x3'/>
        <Button size='extraLarge' primary={true}>Crear nueva etiqueta</Button>
      </main>
    </Layout>
  )
}
