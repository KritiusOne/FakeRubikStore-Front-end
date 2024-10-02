import { PaginatedResponse } from "@/types/ResponseTypes"

export async function getGroupRegisters<T>(PageSize: string, PageNumber: string, token: string, route: string) {
  const params = new URLSearchParams()
    params.append("PageSize", PageSize)
    params.append("PageNumber", PageNumber)
    try { 
      const res = await fetch(route + params.toString(), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      const response: PaginatedResponse<T> = await res.json()
      return response
    } catch (error) {
      console.log(error)
    }
}