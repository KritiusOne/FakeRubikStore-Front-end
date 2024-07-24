import { Icon, IconProps } from "@tabler/icons-react"
import { Button } from "./Button"

interface Props {
  title: string
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
  info: string
  onClickButton: ()=> void
}
export const UserData: React.FC<Props> = ({Icon, info, title, onClickButton})=>{
  return (
    <article className="w-full flex flex-row justify-between items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-lg px-2 py-1">
      <div className="flex flex-row justify-center items-center gap-3">
        <Icon />
        <div>
          <h4 className="text-pretty xl font-semibold"> {title} </h4>
          <p>
            {info}
          </p>
        </div>
      </div>
      <Button onClick={onClickButton} primary={false} size="large"> Cambiar </Button>
    </article>
  )
}