import { PRIVATE_USER_ROUTES } from "@/routes/TypesRoutes"
import { IconUserFilled } from "@tabler/icons-react"
import { Button } from "./ui/Button"
import { useNavigate } from "react-router-dom"

interface Props {
  nameUser?: string
}
export const Avatar: React.FC<Props> = ({nameUser = ""})=> {
  const navegate = useNavigate()
  return (
    <Button size="extraLarge" className="flex flex-row justify-center items-center gap-2" primary={true} onClick={()=> navegate(PRIVATE_USER_ROUTES.PROFILE_CONFIG)}>
      <IconUserFilled /> 
      <span> {nameUser} </span>
    </Button>
  )
}