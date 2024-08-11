import { OrderProduct } from "@/types/OrdersTypes";
import { Product } from "@/types/ProductsTypes";

export function OrderProductToProduct(OPToParse: OrderProduct) {
  const newProduct: Product = {
    id: OPToParse.idProduct,
    name: OPToParse.productInfo.name,
    price: OPToParse.productInfo.price,
    thumbnail: OPToParse.productInfo.thumbnail
  }
  return newProduct
}