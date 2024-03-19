import { HTMLAttributes, useEffect, useState } from "react"
import { Card } from "./Card"

//import { OptionButton } from "./ui/OptionButton"
import { CategoryIcon } from "./ui/icons/CategoryIcon"
import { StartIcon } from "./ui/icons/StarIcon"
import { HeartIcon } from "./ui/icons/HeartIcon"
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
    }, 500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, imgs, false);
  };

  const next = () => {
    selectNewImage(selectedIndex, imgs);
  };
  const handleTesting = () =>{
    console.log("Si clickee")
  }
  return (
    <section aria-label="Hero" className="w-full flex flex-col justify-center items-center gap-5" {...props} >
      <Carrousel imgCarrousel={getImageURL(selectedImg)} previous={previous} next={next} className="flex flex-row justify-center items-center w-[50%] md:w-full" />
      <div className="flex flex-col lg:flex-row justify-around items-center w-full gap-4 px-5"> 
        <Card Icon={CategoryIcon} buttonName="Buscar por categorias" title="Nuestras categorias" handleClick={handleTesting}/>
        <Card title="Mejores Productos" buttonName="Mejor Rankeados" Icon={StartIcon} handleClick={handleTesting}/>
        <Card Icon={HeartIcon} buttonName="Ver Favoritos" handleClick={handleTesting} title="Tus Favoritos" />
      </div>
    </section>
  )
}