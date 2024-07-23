import { useCartStorage } from "@/zustand/CartStorage"
import { Button } from "./ui/Button"
import React from "react"
import { CardCart } from "./CardCart"
import { useNavigate } from "react-router-dom"
import { PRIVATE_USER_ROUTES } from "@/routes/TypesRoutes"

export const CartMenu: React.FC = () => {
  const cartStorage = useCartStorage()
  const navegate = useNavigate()
  const handleClickMenuAside = (e: React.MouseEvent)=>{
    e.stopPropagation()
  }
  const handleClickClose = ()=>{
    cartStorage.changeViewCart(cartStorage.viewCart)
  }
  const handleClickMakeBuy = ()=>{
    navegate(PRIVATE_USER_ROUTES.MAKE_BUY)
  }
  return (
    <div className='w-screen h-screen fixed top-0 right-0 flex items-center justify-center md:justify-end bg-black/[0.5] z-50' onClick={handleClickClose}>
      <aside onClick={handleClickMenuAside} className='flex flex-col justify-between h-4/5 w-4/5 md:h-full lg:w-3/12 md:w-5/12 bg-white text-dark z-50 pb-2'>
        <header className="bg-action px-6 h-10 text-center flex justify-center items-center"> <span className="font-semibold text-xl">Carrito de compras</span></header>
        <main className="flex flex-col items-center md:justify-start h-full py-2 gap-2 overflow-auto px-4">
          <div className="flex flex-col justify-center items-center gap-2">  
            {
              cartStorage.ProductsCart.map(product => <CardCart cantidad={product.numberProd} img={product.thumbnail} price={product.price} title={product.name} id={product.id} key={product.id}  />)
            }
          </div>
        </main>
        <footer className="flex flex-col justify-center items-center mt-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <Button onClick={handleClickMakeBuy} primary={true} size="extraLarge"> Realizar pedido </Button>
            <Button onClick={handleClickClose} size="extraLarge"> Cerrar el carrito </Button>
          </div>
          <span> Total: <strong>${cartStorage.parcialPrice} </strong> </span>
        </footer>
      </aside>
    </div>
  )
}