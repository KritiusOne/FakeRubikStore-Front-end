import { ProductInfo } from "./ProductsTypes";
import { UserOrderInfo } from "./UserTypes";

export interface Order {
  deliveryInfo:  DeliveryInfo;
  userInfo:      UserOrderInfo;
  orderProducts: OrderProduct[];
  id:            number;
  idUser:        number;
  idDelivery:    number;
  date:          Date;
  finalPrice:    number;
}
export interface DeliveryInfo {
  idState: number;
  idUser:  number;
  code:    string;
}
export interface OrderProduct {
  idProduct:      number;
  idOrder:        number;
  productsNumber: number;
  price:          number;
  productInfo:    ProductInfo;
}
export interface CreateOrder {
  idUser:        number;
  date:          Date;
  finalPrice:    number;
  numberCard: string
  orderProducts: CreateOrderProduct[];
}
export interface CreateOrderProduct {
  idProduct:      number;
  productsNumber: number;
  price:          number;
}
export interface BasicOrderInfo {
  id:            number;
  idUser:        number;
  idDelivery:    number;
  date:          Date;
  finalPrice:    number;
  numberCard: string
}