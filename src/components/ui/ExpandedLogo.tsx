import { HTMLAttributes } from "react"
import { Logo } from "./Logo"

interface Props extends HTMLAttributes<HTMLElement> {
  height: string,
  width: string,
  Title: string,
  FillColor: string
}

export const ExpandedLogo: React.FC<Props> = ({Title, FillColor, height, width,...props})=>{
  return (
    <div {...props}>
      <h1>
        {Title}
      </h1>
      <Logo FillColor={FillColor} height={height} width={width} />
    </div>
  )
}