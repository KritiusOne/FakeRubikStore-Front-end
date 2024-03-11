interface Props {
  title: string
  thumbnail: string
  price: number
  categories: string | string[]
  originalPrice: number
  priceOff: number
}
export const CardProduct: React.FC<Props> = ({title, thumbnail, price, categories, originalPrice, priceOff})=>{
  return (
    <article className="relative flex flex-col justify-center items-center bg-bgLight">
      <header> <img src={thumbnail} alt={`Miniatura del producto ${title}`} /> </header>
      <h3> {title} </h3>
      <section> {categories} </section>
      <section>
        <h2> {originalPrice} </h2>
        <h2> {Math.round(price)} </h2>
      </section>
      <span> {priceOff}% </span>
      <footer>
        <button>Añadir al carrito</button>
        <button> ver el producto</button>
      </footer>
    </article>
  )
}