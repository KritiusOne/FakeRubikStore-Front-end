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
export const MyRoutes: React.FC<{}> = () => {
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
        </Route>
        <Route element={<Auth_Guard />} >
          <Route path={PRIVATE_USER_ROUTES.PROFILE_CONFIG} element={<ProfileConfig />} />
        </Route>
        <Route element={<Auth_Guard />} >
          <Route path={PRIVATE_USER_ROUTES.EDIT_USER_INFO} element={<EditUserInfo />} />
        </Route>
        <Route element={<Auth_Guard />}>
          <Route path={PRIVATE_USER_ROUTES.SHOPPING_HISTORY} element={<ShoppingHistory />} />
        </Route>
        <Route element={<Auth_Guard />}>
          <Route path={PRIVATE_USER_ROUTES.SHOPPING_DETAILS} element={<ShoppingDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}