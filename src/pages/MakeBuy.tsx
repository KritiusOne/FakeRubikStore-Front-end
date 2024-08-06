import { CardMakeBuy } from "@/components/CardMakeBuy"
import { Layout } from "@/components/Layout"
import { Button } from "@/components/ui/Button"
import { GroupInput } from "@/components/ui/GroupInput"
import { UserData } from "@/components/ui/UserData"
import { AddressById } from "@/types/UserTypes"
import { useCartStorage } from "@/zustand/CartStorage"
import { useURLStorage } from "@/zustand/URLStorage"
import { useUserSesion } from "@/zustand/UserStorage"
import { IconAddressBook, IconCreditCard, IconUser } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export const MakeBuy: React.FC = () => {
  const infoUser = useUserSesion(Storage => Storage.infoUser)
  const token = useUserSesion(Storage => {
    return `${Storage.typetoken} ${Storage.token}`
  })
  const cart = useCartStorage()
  const [addres, setAddress] = useState<AddressById>()
  const [cardNumber, setCardNumber] = useState("")
  const getAddresById = useURLStorage(Storage => Storage.GetAddressById)

  useEffect(() => {
    const getAddressInfoById = async () => {
      try {
        if (infoUser != null) {
          const URL = getAddresById(infoUser.IdAddress)
          const res = await fetch(URL, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            }
          })
          if (res.ok) {
            const response: AddressById = await res.json()
            setAddress(response)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAddressInfoById()
  }, [])
  return (
    <Layout>
      <main className="bg-bgLight my-10 w-full h-full p-5 flex flex-col gap-4">
        <h1 className="font-mono text-3xl font-bold text-center text-black"> Realizar compra </h1>
        <div className="flex max-w-full flex-col-reverse md:grid md:grid-cols-2 justify-center items-center md:items-start gap-2">
          <section className="h-full w-full flex flex-col items-start justify-start gap-2">
            <UserData Icon={IconUser} info={`${infoUser?.First_Name} ${infoUser?.Last_Name}  - ${infoUser?.phone == "-" || infoUser?.phone == undefined ? "Telefono no definido" : infoUser.phone}`} title="Contacto" />
            <UserData Icon={IconAddressBook} info={addres == undefined ? "#" : addres.address} title="Dirección" />
            <div id="payment" className="w-full h-full shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-t-lg flex flex-col justify-start items-start gap-6 pb-2">
              <h2 className="w-full bg-bgDark text-bgLight text-start px-2 py-1 rounded-t-lg text-lg">
                Metodo de pago
              </h2>
              <span className="w-full flex flex-row justify-start items-start text-start px-2 py-1 gap-2">
                <IconCreditCard width={32} height={32} /> <h3 className="text-xl font-semibold capitalize">Tarjeta de debito/Credito</h3>
              </span>
              <form className="w-full px-2 flex flex-col justify-start items-start gap-2">
                <GroupInput autoComplete="off" labelTitle="Ingrese su tarjeta de credito" placeholder="1234567890" value={cardNumber}
                onChange={(e)=> setCardNumber(e.currentTarget.value)} />
              </form>
              <div className="w-7/12 px-2">
              </div>
            </div>
          </section>

          <aside className=" w-full flex flex-col justify-center items-start gap-3 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 py-2 rounded-lg">
            <h2 className="font-semibold font-sans text-2xl flex flex-col justify-center items-start gap-2">Tu orden </h2>
            <div className="flex flex-col justify-center items-center gap-2 w-full">
              {
                cart.ProductsCart.length > 0 && cart.ProductsCart.map(product => <CardMakeBuy product={product} />)
              }
              {
                cart.ProductsCart.length == 0 && <h3 className="font-semibold text-lg "> Tú carrito de Fake Rubik Store está vacío </h3>
              }
            </div>
            <hr
              className="my-4 h-0.5 w-full border-t-0 bg-transparent bg-gradient-to-r from-transparent via-primaryRed to-transparent opacity-50"
            />
            <div className="flex flex-col justify-center items-center sm:items-end w-full gap-0.5 md:gap-2">
              <strong className="text-lg capitalize text-balance text-center sm:text-end"> <span className="font-thin"> total de tipo de productos:</span> {cart.ProductsCart.length} productos </strong>
              <strong className="text-lg capitalize text-balance text-center sm:text-end"> <span className="font-thin"> total de unidades:</span> {cart.ProductsCart.reduce((prev, current) => prev + current.numberProd, 0)} productos </strong>
              <strong className="text-lg capitalize text-balance text-center sm:text-end"> <span className="font-thin">precio parcial:</span> ${cart.parcialPrice} productos </strong>
              <Button primary={true} size="extraLarge" > Realizar Compra </Button>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  )
}