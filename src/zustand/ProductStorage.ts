import { getFormatProducts } from "@/lib/getFormatProducts";
import { Category, FilterByTag, Product, ProductMock, Response } from "@/types/ProductsTypes";
import { ResponseBase } from "@/types/ResponseTypes";
import { create } from "zustand";
interface ProductStorageTypes {
  AllProducts: Product[]
  BestProducts: Product[]
  MinPriceValue: number
  MaxPriceValue: number
  ProductTags: FilterByTag[]
  load: boolean
  setLoad: (stateLoad: boolean) => void
  getProductsMock: (newProducts: ProductMock[]) => void
  getProducts: (url: string) => void
  setMinPrice: (newMinPrice: number) => void
  setMaxPrice: (newMaxPrice: number) => void
  setProductsTags: () => void
  toggleProductTag: (id: number) => void
  setVoidTags: ()=> void
}
export const useProductStorage = create<ProductStorageTypes>((set, get) => ({
  AllProducts: [],
  BestProducts: [],
  MaxPriceValue: 250000,
  MinPriceValue: 0,
  ProductTags: [],
  load: false,
  setVoidTags() {
    const storage = get()
    const productsTags = storage.ProductTags.map(tag => {
      const tagFilter: FilterByTag = {
        isSelect: false,
        Tag: tag.Tag
      }
      return tagFilter
    })
    set({...storage, ProductTags: [...productsTags] })
  },
  setLoad(stateLoad) {
    const storage = get()
    set({...storage, load: stateLoad})
  },
  setProductsTags: async () => {
    const Storage = get()
    if (Storage.ProductTags.length == 0) {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL_GET_ALL_TAGS)
        if (res.ok) {
          const response: ResponseBase<Category[]> = await res.json()
          const filtersByTags = response.response.map((tag) => {
            const filterByTag: FilterByTag = {
              isSelect: false,
              Tag: tag
            }
            return filterByTag
          })
          set({ ...Storage, ProductTags: filtersByTags })
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  toggleProductTag(id) {
    const Storage = get()
    const toUpdateValue = Storage.ProductTags.filter(tag => tag.Tag.id == id)
    if(toUpdateValue.length != 0) {
      toUpdateValue[0].isSelect = !toUpdateValue[0].isSelect
      const newPT = Storage.ProductTags.filter(tag => tag.Tag.id != id)
      set({...Storage, ProductTags: [...newPT, ...toUpdateValue].sort((a, b)=> a.Tag.id - b.Tag.id)})
    }
  },
  setMinPrice(newMinPrice) {
    const Storage = get()
    if (newMinPrice <= 100000) {
      set({ ...Storage, MinPriceValue: newMinPrice })
    }
  },
  setMaxPrice(newMaxPrice) {
    const Storage = get()
    if (newMaxPrice >= 100000) {
      set({ ...Storage, MaxPriceValue: newMaxPrice })
    }
  },
  getProductsMock: (newProucts) => {
    const formatersProducts = newProucts.map((product) => getFormatProducts(product))
    const sortAllProducts = formatersProducts.sort((product) => product.price)
    set({ AllProducts: formatersProducts, BestProducts: sortAllProducts.slice(0, 10) })
  },
  getProducts: async (url) => {
    const response = await fetch(url)
    if (response.ok) {
      const res: Response = await response.json()
      set({ AllProducts: res.response, BestProducts: res.response.slice(0, 10) })
    }
  }
}))
