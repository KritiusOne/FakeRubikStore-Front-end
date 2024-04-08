export interface Product {
  id:          number;
  name:        string;
  price:       number;
  stock:       number;
  image:       string;
  description: string;
  thumbnail:   string;
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
