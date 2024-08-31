import { Layout } from '@/components/Layout'
import React from 'react'

interface Props{

}
export const PanelControl: React.FC<Props> = () => {
  return (
    <Layout>
      <div className=''>
        <aside>
          Este es el aside
        </aside>
        <main>
          este es el main
        </main>
      </div>
    </Layout>
  )
}
