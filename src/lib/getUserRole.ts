export const ROLE_NAME =[
  "ADMINISTRADOR",
  "USUARIO",
  "VENDEDOR"
]
export function getUserRole(idRol:number){
  return ROLE_NAME[idRol - 1]
}