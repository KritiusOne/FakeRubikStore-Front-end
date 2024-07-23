import { CardMakeBuy } from "@/components/CardMakeBuy"
import { Layout } from "@/components/Layout"
import { useCartStorage } from "@/zustand/CartStorage"
import { useUserSesion } from "@/zustand/UserStorage"

export const MakeBuy: React.FC = ()=>{
  const UserInfo = useUserSesion(Storage => Storage.infoUser)
  const cart = useCartStorage()
  return (
    <Layout>
      <main className="bg-bgLight my-10 w-full h-full p-5 gap-5">
        <h1 className="font-mono text-3xl font-bold text-center text-black"> Realizar compra </h1>
        <div className="grid grid-cols-2 justify-center items-center gap-2">
          <section>
            <article>
              login info
            </article>
            <article>
              payment method
            </article>
          </section>
          <aside className="w-full flex flex-col justify-center items-start gap-3">
            <h2 className="font-semibold font-sans text-2xl flex flex-col justify-center items-start gap-2">Tu orden </h2>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              {
                cart.ProductsCart.length > 0 && cart.ProductsCart.map(product => <CardMakeBuy product={product} /> )
              }
              {
                cart.ProductsCart.length == 0 && <h3 className="font-semibold text-lg "> Tú carrito de Fake Rubik Store está vacío </h3>
              }
            </div>
            <hr
      className="my-4 h-0.5 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-primaryRed to-transparent opacity-50"
    />
            <div className="flex flex-col justify-center items-end w-full">
              <strong className="text-lg capitalize"> <span className="font-thin"> total de tipo de productos:</span> {cart.ProductsCart.length} productos </strong>
              <strong className="text-lg capitalize"> <span className="font-thin"> total de unidades:</span> {cart.ProductsCart.reduce((prev, current)=> prev + current.numberProd, 0)} productos </strong>
              <strong className="text-lg capitalize"> <span className="font-thin">precio parcial:</span> {cart.parcialPrice} productos </strong>
            </div>
            
          </aside>

        </div>
      </main>
    </Layout>
  )
}