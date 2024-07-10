export interface ResponseWithToken<T> {
  token:    string  
  msg:      string
  response: T
}
export interface ResponseBase<T> {
  msg:      string
  response: T
}