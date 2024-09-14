
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
  EDIT_USER_INFO: "/update/:id",
  SHOPPING_DETAILS: "/shopping-history/:id"
}
export const PRIVATE_SELLER_ROUTES = {
  SELL_ORDERS: "/sell/orders"
}
export const PRIVATE_ADMIN_ROUTES = {
  EDIT_PRODUCTS: "/products/edit",
  CONTROL_PANEL: "/panel",
  CREATE_PRODUCT: "/panel/newproduct"
}