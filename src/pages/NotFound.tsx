import { Layout } from "../components/Layout"

export const NotFount: React.FC = ()=>{
  return (
    <Layout>
      <main className="my-10 w-full h-full bg-bgLight flex flex-col px-4 py-2 justify-center items-center gap-2 font-oswald">
        <h2 className="text-[150px] font-bold text-pretty text-center leading-tight">Oops!</h2>
        <h3 className="text-xl font-normal text-balance text-center">404 - Pagina no enontrada</h3>
        <p className="text-md font-thin text-balance text-center">
          La url que haz buscado no existe. Regrese a la pagina principal
        </p>
      </main>
    </Layout>
  )
}