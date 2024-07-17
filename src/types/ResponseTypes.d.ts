export interface ResponseWithToken {
  msg:      string
  response:    string  
  typeToken: string
}
export interface ResponseBase<T> {
  msg:      string
  response: T
}