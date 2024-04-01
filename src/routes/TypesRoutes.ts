
export const PUBLIC_ROUTES = {
  HOME: "/",
  SEARCH: "/:product-name",
  PRODUCTS: "/products",
  VIEW_PRODUCT: "/products/details/:id",
  ABOUT: "/about-us",
  LOGIN: "/login",
  SINGIN: "/signin",
  404: "*"
}
export const PRIVATE_USER_ROUTES = {
  PROFILE_CONFIG: "/profile",
  CART: "/cart",
  MAKE_BUY: "/confirm_buy",
  SHOPPING_HISTORY: "/shopping-history",
}
export const PRIVATE_SELLER_ROUTES = {
  REPORTS_AREA: "/reports-area/:idArea",
  EDIT_PRODUCTS: "/products/edit",
  CREATE_REPORTS: "/reports-area/:idArea/create"
}
export const PRIVATE_ADMIN_ROUTES = {
  
}