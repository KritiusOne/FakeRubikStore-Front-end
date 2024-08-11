export interface ResponseWithToken {
  msg:      string
  response:    string  
  typeToken: string
}
export interface ResponseBase<T> {
  msg:      string
  response: T
}
export interface PaginatedResponse<T> {
  metaData:   MetaData;
  statusCode: number;
  msg:        string;
  response:   T;
}
export interface MetaData {
  totalCount:      number;
  pageSize:        number;
  currentPage:     number;
  totalPage:       number;
  hasNextPage:     boolean;
  hasPreviousPage: boolean;
  nextPageURL:     string;
  previousPageURL: string;
}
