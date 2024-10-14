export interface Product {
  id:          number;
  name:        string;
  price:       number;
  thumbnail:   string;
}
export interface AllDataProduct {
  reviews:           Review[];
  productCategories: any[];
  id:                number;
  name:              string;
  price:             number;
  stock:             number;
  image:             string;
  description:       string;
  thumbnail:         string;
}
export interface ProductMock {
  id:                 number;
  title:              string;
  description:        string;
  price:              number;
  discountPercentage: number;
  rating:             number;
  stock:              number;
  brand:              string;
  category:           string;
  thumbnail:          string;
  images:             string[];
}
export interface MetaData {
  totalCount:      number;
  pageSize:        number;
  currentPage:     number;
  totalPage:       number;
  hasNextPage:     boolean;
  hasPreviousPage: boolean;
  nextPageURL:     string;
  previousPageURL: string;
}
export interface Response {
  metaData:   MetaData;
  statusCode: number;
  msg:        string;
  response:   Product[];
}
export interface Review {
  productId:   number;
  userId:      number;
  description: string;
  rate:        number;
}

export interface ProductInCart extends Product {
  numberProd: number
}
export interface ProductInfo {
  id:          number;
  name:        string;
  price:       number;
  stock:       number;
  image:       string;
  description: string;
  thumbnail:   string;
}
export interface ProductCategories {
  idCategory?: number | string,
  idProduct: number | string
}
export interface CreateProductTag {
  name: string
  productCategories: ProductCategories[]
}
export interface Category {
  id: number
  name: string
}