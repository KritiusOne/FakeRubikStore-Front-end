export const FiltersProductsNames = {
  CategoriesIds: "CategoriesIds",
  DescriptionProduct: "DescriptionProduct",
  MaxPrice: "MaxPrice",
  MinPrice: "MinPrice",
  NameProduct: "NameProduct",
  PageNumber: "PageNumber",
  PageSize: "PageSize",
}
export function formatURLtoNavParams(params: URLSearchParams, baseURL: string){
  const base = baseURL.split(":")
  return `${base[0]}${base[1]}?${params.toString()}`
}