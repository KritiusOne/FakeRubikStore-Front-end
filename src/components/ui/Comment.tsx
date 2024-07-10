import React from "react";
import { Stars } from "./Stars";
interface Props {
  rate: number
  description: string
}
export const Comment: React.FC<Props> = ({description, rate})=> {
  return (
    <div className="flex flex-col justify-center items-start gap-2">
      <Stars numStars={rate} size="small" />
      <p className="text-balance text-sm">
        {
          description
        }
      </p>
    </div>
  )
}