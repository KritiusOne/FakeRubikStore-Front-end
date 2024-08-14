import { BestProductsSection } from "@/components/BestProductsSection";
import { Hero } from "@/components/Hero";
import { Layout } from "@/components/Layout"
import { CardProduct } from "@/components/ui/CardProduct";
//import response from "@/lib/mocks/products.json"
import { useProductStorage } from "@/zustand/ProductStorage";
import { useURLStorage } from "@/zustand/URLStorage";
import { useEffect } from "react";
export const Home: React.FC = () => {
  const products = useProductStorage()
  const url = useURLStorage(urlStorage => urlStorage.Products)
  useEffect(() => {
    products.getProducts(url)
  }, [])
  return (
    <Layout>
      <main className="max-w-full p gap-10 flex flex-col justify-around items-center my-6">
        <Hero />
        <BestProductsSection />
        <div className="flex flex-col justify-center gap-2 w-full px-5">
          <h2 className="text-2xl md:text-4xl text-center text-bgLight font-bold">Cubos de Rubik</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 w-full px-4">
            {
              products.AllProducts.map((product) => <CardProduct key={product.id}
                price={product.price}
                productId={product.id}
                thumbnail={product.thumbnail}
                title={product.name} />)
            }
          </div>
        </div>
        <div className="w-11/12 h-full bg-bgLight text-center py-4">
          <h3 className="text-xl w-full font-semibold text-pretty text-center">
            Sobre Fake Rubik Store
          </h3>
          <p className="text-md font-thin ">
            Únete a la comunidad de apasionados del cubo de Rubik. En nuestra tienda, encontrarás una amplia selección de cubos diseñados para todos los niveles, desde principiantes hasta expertos. ¡Desafía tus habilidades y descubre la emoción de resolver un nuevo rompecabezas!
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 justify-center items-start gap-2">
            <div className="flex flex-col justify-center items-center text-start px-4">
              <h4 className="text-lg w-full font-semibold text-pretty text-center"> ¿Que cubo comprar? </h4>
              <p className="text-md">
                La elección del cubo de Rubik ideal depende de tu nivel de experiencia y de cómo quieras disfrutarlo.
                <ul className="flex flex-col gap-2">
                  <li>
                    <strong> Principiantes: </strong> Un 3x3 estándar es el punto de partida perfecto. Busca uno con una rotación suave y un mecanismo resistente.
                  </li>
                  <li> <strong> Intermedios: </strong> Explora cubos 2x2, Pyraminx o Skewb para aumentar la dificultad y variedad. </li>
                  <li> <strong>Expertos:</strong> Si buscas velocidad, los cubos magnéticos de alta gama son tu mejor opción.</li>
                </ul>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-start px-4">
              <h4 className="text-lg w-full font-semibold text-pretty text-center"> ¿Quien es el mejor cubero de la historia? </h4>
              <p className="text-md ">
                Hay 2 nombres que sobresalen
                <ul className="text-start flex flex-col gap-2">
                  <li> <strong>Max Park:</strong> Conocido por su velocidad y consistencia, Max Park ha establecido numerosos récords mundiales y es considerado uno de los mejores speedcubers de la actualidad. </li>
                  <li><strong>Feliks Zemdegs:</strong> Otro nombre muy respetado en la comunidad, Feliks Zemdegs ha sido campeón del mundo en múltiples ocasiones y es reconocido por su estilo elegante y eficiente.</li>
                </ul>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-start px-4">
              <h4 className="text-lg w-full font-semibold text-pretty text-center"> ¿Que marca de cubo comprar? </h4>
              <p className="text-md font-thin ">
                Hay 3 marcas que sobresalen por encima del resto: GAN, Qiyi y Moyu. Cada una tiene cubos bastante buenos, como el Tornado V3, GAN 12 o Super Weilong, y tambien ofrecen buenos productos en la gama economica
              </p>
            </div>
            <div className="flex flex-col justify-center items-center text-start px-4">
              <h4 className="text-lg w-full font-semibold text-pretty text-center"> ¿Como puedo aprender a armar el cubo de rubik?? </h4>
              <p className="text-md font-thin ">
                Nuestra tienda ofrece junto con todas las compras un tutorial en forma de manual para resolver el cubo en cuestión. Además, nuestra tienda realiza tutoriales periodicamente en nuestras redes sociales
              </p>
            </div>
            
          </div>
        </div>
      </main>
    </Layout>
  )
}