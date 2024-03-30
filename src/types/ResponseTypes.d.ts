export interface ResponseWithToken<T> {
  token:    string  
  msg:      string
  response: T
}