import { HTMLAttributes, useEffect, useState } from "react"
import { Carrousel } from "./ui/Carrousel"
import { getImageURL } from "@/lib/getImgURL"
interface Props extends HTMLAttributes<HTMLElement> {}
export const Hero: React.FC<Props> = ({...props})=>{
  const imgs =  ["banner.webp", "img-carrousel-1.webp", "img-carrousel-2.webp", "img-carrousel-3.webp", "img-carrousel-4.webp" ]
  const [selectedImg, setSelectedImage] = useState(imgs[0])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  
  useEffect(()=>{
    const interval = setInterval(() => {
      selectNewImage(selectedIndex, imgs);
    }, 30000);
    return () => clearInterval(interval);
  })
  const selectNewImage = (index: number, images: string[], next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
      const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 500)
  }

  const previous = () => {
    selectNewImage(selectedIndex, imgs, false);
  }

  const next = () => {
    selectNewImage(selectedIndex, imgs);
  }
  return (
    <section aria-label="Hero" className="w-10/12 mt-10" {...props} >
      <Carrousel imgCarrousel={getImageURL(selectedImg)} previous={previous} next={next} className="flex flex-row justify-center items-center w-full" />
    </section>
  )
}