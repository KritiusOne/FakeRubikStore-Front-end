export interface Product {
  id: number; 
  name:        string;
  price:       number;
  stock:       number;
  image:       string;
  description: string;
  thumbnail:   string;
  rating:      number;
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
