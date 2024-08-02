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
  id: number;
  idRole: number;
  idAddress: number;
  name: string;
  secondName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserUpdateBaseInfo {
  name: string;
  secondName: string;
  email: string;
  phone: string;
  password: string;
}

export interface AddressUserUpdate {
  address: string;
  city: string;
  state: string;
  country: string;
  description: string;
}

export interface AddressById {
  User: UserOrderInfo
  id: number
  address: string;
  city: string;
  state: string;
  country: string;
  description: string;
}