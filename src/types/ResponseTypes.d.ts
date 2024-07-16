export interface ResponseWithToken {
  msg:      string
  response:    string  
  typetoken: string
}
export interface ResponseBase<T> {
  msg:      string
  response: T
}