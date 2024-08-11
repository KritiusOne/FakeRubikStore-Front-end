export enum DeliveryStates {
  ENTREGADO = 1,
  NO_ENTREGADO = 2,
  EN_PREPARACION = 3,
  ENVIADO = 4,
  CANCELADO = 5
}
export const getInWordStateDelivery = (stateDelivery: number) => {
  return DeliveryStates[stateDelivery].toString().replace("_", " ")
}