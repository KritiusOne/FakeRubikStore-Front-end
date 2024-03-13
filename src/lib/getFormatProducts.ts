import { Product, ProductMock } from "@/types/ProductsTypes";
export function getFormatProducts(Product: ProductMock){
  const newProduct: Product = {
    description: Product.description,
    image: Product.images[0],
    name: Product.title,
    price: Product.price,
    stock: Product.stock,
    thumbnail: Product.thumbnail,
    rating: Product.rating,
    id: Product.id
  }
  return newProduct
}