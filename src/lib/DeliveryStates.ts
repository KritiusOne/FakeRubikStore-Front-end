export enum DeliveryStates {
  NO_ATENDIDO = 1,
  EN_PREPARACION,
  ENVIADO,
  ENTREGADO,
  CANCELADO
}
export const getInWordStateDelivery = (stateDelivery: number) => {
  return DeliveryStates[stateDelivery].toString().replace("_", " ")
}