export const ROLE_NAME =[
  "ADMINISTRADOR",
  "USUARIO",
  "VENDEDOR"
]
export function getUserRole(idRol:number){
  return ROLE_NAME[idRol - 1]
}
export function getNumberRole(NameRol:string){
  if(ROLE_NAME.includes(NameRol)){
    const indexRol = ROLE_NAME.indexOf(NameRol)
    console.log(ROLE_NAME[indexRol])
    return indexRol + 1
  }
  return -1
}