import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PUBLIC_ROUTES, PRIVATE_ADMIN_ROUTES, PRIVATE_SELLER_ROUTES, PRIVATE_USER_ROUTES } from "./TypesRoutes"
import { Home } from "@/pages/Home"
import { Login } from "@/pages/Login"
import { SingIn } from "@/pages/SingIn"
import { NotFount } from "@/pages/NotFound"
import { DetailsProduct } from "@/pages/DetailsProduct"
import { Auth_Guard } from "./Auth.guard"
import { MakeBuy } from "@/pages/MakeBuy"
import { ProfileConfig } from "@/pages/ProfileConfig"
import { EditUserInfo } from "@/pages/EditUserInfo"
import { ShoppingHistory } from "@/pages/ShoppingHistory"
import { ShoppingDetails } from "@/pages/ShoppingDetails"
import { useUserSesion } from "@/zustand/UserStorage"
import { useEffect } from "react"
import { SellersAuth_Guard } from "./SellersAuth.guard"
import { Orders } from "@/pages/Orders"
import { OnlyAdmins_Guard } from "./OnlyAdmins.guard"
import { PanelControl } from "@/pages/PanelControl"
import { CreateProduct } from "@/pages/CreateProduct"
import { EditProduct } from "@/pages/EditProduct"

export const MyRoutes: React.FC<{}> = () => {
  const haveSesion = useUserSesion(state => state.haveSesion)
  useEffect(()=>{
    haveSesion()
  }, [haveSesion])
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PUBLIC_ROUTES.HOME} element={<Home />} />
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route path={PUBLIC_ROUTES.SINGIN} element={<SingIn />} />
        <Route path={PUBLIC_ROUTES.VIEW_PRODUCT} element={<DetailsProduct />} />
        <Route path={PUBLIC_ROUTES[404]} element={<NotFount />} />

        <Route element={<Auth_Guard />} >
          <Route path={PRIVATE_USER_ROUTES.MAKE_BUY} element={<MakeBuy />} />

          <Route path={PRIVATE_USER_ROUTES.PROFILE_CONFIG} element={<ProfileConfig />} />

          <Route path={PRIVATE_USER_ROUTES.EDIT_USER_INFO} element={<EditUserInfo />} />

          <Route path={PRIVATE_USER_ROUTES.SHOPPING_HISTORY} element={<ShoppingHistory />} />
          
          <Route path={PRIVATE_USER_ROUTES.SHOPPING_DETAILS} element={<ShoppingDetails />} />
        </Route>
        <Route element={<SellersAuth_Guard />}>
          <Route path={PRIVATE_SELLER_ROUTES.SELL_ORDERS} element={<Orders />} />
        </Route>
        <Route element={<OnlyAdmins_Guard />}>
          <Route path={PRIVATE_ADMIN_ROUTES.CONTROL_PANEL} element={<PanelControl />} />
          <Route path={PRIVATE_ADMIN_ROUTES.CREATE_PRODUCT} element={<CreateProduct />} />
          <Route path={PRIVATE_ADMIN_ROUTES.EDIT_PRODUCT} element={<EditProduct />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}