import { UpdateUserRol, UserOrderInfo } from '@/types/UserTypes'
import React, { useState } from 'react'
import { Table } from './Table'
import { IconEdit } from '@tabler/icons-react'
import { Button } from './ui/Button'
import { Spinner } from './ui/Spinner'
import { Dialog } from './ui/Dialog'
import { Dropdown } from './ui/Dropdown'
import { getNumberRole, ROLE_NAME } from '@/lib/getUserRole'
import { useURLStorage } from '@/zustand/URLStorage'
import { useUserSesion } from '@/zustand/UserStorage'

interface Props {
  load: boolean
  InfoUsers?: UserOrderInfo[]
  myRef: React.RefObject<HTMLDivElement>
}
type ROLES_USERS = "ADMINISTRADOR" | "USUARIO" | "VENDEDOR"
const UsersDashboard: React.FC<Props> = ({ load, myRef, InfoUsers }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserOrderInfo>()
  const [newUserRole, setNewUserRole] = useState<ROLES_USERS>("USUARIO")
  const [msg, setMsg] = useState("")
  const { UpdateUserRol } = useURLStorage()
  const {typetoken, token, infoUser} = useUserSesion()
  const [sendSolicitud, setSendSolicitud] = useState(false)

  const handleClick = (user: UserOrderInfo) => {
    setSelectedUser(user)
    setShowModal(true)
  }
  const handleClickClose = () => {
    setSelectedUser(undefined)
    setShowModal(false)
  }
  const handleChangeNewUserRole = (opt: string) => {
    if (ROLE_NAME.includes(opt)) {
      setNewUserRole(opt as ROLES_USERS)
    } else {
      setNewUserRole("USUARIO")
      setMsg("Se intentó elegir un rol que no corresponde a los establecidos")
    }
  }
  const handleUpdateUser = async () => {
    setSendSolicitud(true)
    if (!ROLE_NAME.includes(newUserRole)) {
      setMsg("El rol es inadecuado")
      return
    }
    if(selectedUser == undefined){
      setMsg("No se a elegido correctamente al usuario al que se actualizarán los datos")
      return
    }
    const NumberRol = getNumberRole(newUserRole)
    const UserInfoToDB: UpdateUserRol = {
      IdUserToUpdate: selectedUser.id,
      NewIdRol: NumberRol
    }
    console.log(UserInfoToDB)
    try {
      const res = await fetch(UpdateUserRol, {
        method: "PUT",
        body: JSON.stringify(UserInfoToDB),
        headers: {
          Authorization: typetoken + " " + token,
          'Content-Type': 'application/json'
        }
      })
      console.log(res.ok)
      if(res.ok) {
        const response = await res.text()
        setMsg(`${response}. En breves se actualizará la información`)
        setTimeout(()=> location.reload(), 2000)
      }
    } catch (error) {
      setSendSolicitud(false)
      setMsg("Hubo un error en la solicitud")
      console.log(error)
    }
  }
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
      </div>
      <div className='w-full overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center items-center gap-2'>
        {
          InfoUsers != undefined && infoUser != null && (
            <Table>
              <Table.Header>
                <Table.HeaderTitle>Id</Table.HeaderTitle>
                <Table.HeaderTitle>Nombre</Table.HeaderTitle>
                <Table.HeaderTitle>Email</Table.HeaderTitle>
                <Table.HeaderTitle>Rol</Table.HeaderTitle>
                <Table.HeaderTitle>Acciones</Table.HeaderTitle>
              </Table.Header>
              <Table.Body>
                {
                  InfoUsers.filter(user => user.email != infoUser.email).map(user => {
                    return (
                      <Table.BodyRow key={user.id} title={user.id.toString()}>
                        <Table.Cell className='text-wrap max-w-10 md:max-w-full'>
                          {user.name + " " + user.secondName}
                        </Table.Cell>
                        <Table.Cell className='max-w-48 text-wrap overflow-auto md:max-w-full'>
                          {user.email}
                        </Table.Cell>
                        <Table.Cell>
                          {
                            user.idRole
                          }
                        </Table.Cell>
                        <Table.Cell>
                          <div className='w-full h-full flex flex-row justify-center items-center gap-2'>
                            <Button onClick={() => handleClick(user)}>
                              <IconEdit />
                            </Button>
                          </div>
                        </Table.Cell>
                      </Table.BodyRow>
                    )
                  })
                }
              </Table.Body>
            </Table>
          )
        }
      </div>
      <div ref={myRef}>
        {
          load && <Spinner />
        }
      </div>
      {
        showModal && selectedUser != undefined && (
          <Dialog onClose={() => handleClickClose()}>
            <div className='w-full h-full text-center flex flex-col justify-center items-center gap-2 p-2 bg-bgLight'>
              <h2 className='text-3xl font-oswald text-pretty'>Actualización del usuario</h2>
              <Dropdown AllOptions={ROLE_NAME} handleChange={handleChangeNewUserRole} title='Rol del usuario' />
              {sendSolicitud && <Spinner />}
              {msg != "" && <strong className='text-red text-xl'> {msg} </strong>}
              <Button onClick={() => handleUpdateUser()} primary={true} size='extraLarge'>Actualizar</Button>
            </div>
          </Dialog>
        )
      }
    </div>
  )
}
export default UsersDashboard