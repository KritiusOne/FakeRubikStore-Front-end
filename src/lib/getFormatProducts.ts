import { Product, ProductMock } from "@/types/ProductsTypes";
export function getFormatProducts(Product: ProductMock){
  const newProduct: Product = {
    name: Product.title,
    price: Product.price,
    thumbnail: Product.thumbnail,
    id: Product.id
  }
  return newProduct
}