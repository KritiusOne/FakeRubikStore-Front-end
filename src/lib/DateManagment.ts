export const getSimpleDate = (DateBuy: Date) => {
  const date = new Date(DateBuy)
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ]
  const Meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ]
  return `${day} de ${Meses[month]} del ${year}`
}
export const isLowerMonth = (date: Date)=>{
  const MONTH = 1000 * 60 * 60 * 24 * 30
  const ahora = new Date()
  return (ahora.getTime() - date.getTime()) <= MONTH
}
export const isLowerWeek = (date: Date)=>{
  const SEMANA = 1000 * 60 * 60 * 24 * 7
  const ahora = new Date()
  return (ahora.getTime() - date.getTime()) <= SEMANA
}
export const isLowerDay = (date: Date)=>{
  const DAY = 1000 * 60 * 60 * 24 * 1
  const ahora = new Date()
  return (ahora.getTime() - date.getTime()) <= DAY
}