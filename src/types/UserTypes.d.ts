export interface User {
  Id: string;
  IdRole: string;
  IdAddress: string;
  First_Name: string;
  Last_Name: string;
  email: string;
  phone: string;
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
}
export interface SignInUserInfo {
  name: string;
  secondName: string;
  email: string;
  phone: string;
  password: string;
}
export interface UserOrderInfo {
  id:         number;
  idRole:     number;
  idAddress:  number;
  name:       string;
  secondName: string;
  email:      string;
  phone:      string;
  password:   string;
}