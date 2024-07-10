import { Review } from "@/types/ProductsTypes";
import React, { useEffect, useState } from "react";
interface Props {
  reviews?: Review[]
  typeBar: "1" | "2" | "3" | "4" | "5"
}
export const ProgressBar: React.FC<Props> = ({reviews, typeBar}) => {
  const [percent, setPercent] = useState("0%")
  useEffect(()=>{
    if(reviews != undefined){
      const allTypeReviews = reviews.filter((review)=>{
        if(typeBar == "1"){
          return review.rate == 1 ? review : null
        }
        if(typeBar == "2"){
          return review.rate == 2 ? review : null
        }
        if(typeBar == "3"){
          return review.rate == 3 ? review : null
        }
        if(typeBar == "4"){
          return review.rate == 4 ? review : null
        }
        if(typeBar == "5"){
          return review.rate == 5 ? review : null
        }
      }) 
      const sumRateReview = allTypeReviews.reduce((prev, current)=> prev + current.rate, 0)
      const prom = sumRateReview / allTypeReviews.length
      const finalPercent = (prom / 5) * 100
      setPercent(finalPercent.toString() + "%")
    }
  }, [reviews])
  return (
    <div className="rounded-md h-1 w-full bg-bgDark dark:bg-neutral-600">
      <div className={`rounded-md h-1 ${typeBar == "1" ? "bg-primaryRed" : typeBar == "2" ? "bg-orange-500" : typeBar == "3" ? "bg-yellow-300" : typeBar == "4" ? "bg-green" : "bg-blue-500"}`} style={{ width: percent }}></div>
    </div>
  )
}