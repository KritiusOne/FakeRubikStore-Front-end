import { User } from '@/types/UserTypes'
import React from 'react'
import { Table } from './Table'
import { IconEdit } from '@tabler/icons-react'
import { Button } from './ui/Button'
import { Spinner } from './ui/Spinner'

interface Props {
  load: boolean
  InfoUsers?: User[]
  myRef: React.RefObject<HTMLDivElement>
}
export const UsersDashboard: React.FC<Props> = ({load, myRef, InfoUsers}) => {
  return (
    <div className='max-w-5xl flex flex-col justify-center items-center gap-2'>
      <div className='w-full flex flex-row justify-between items-center'>
        <h2 className='text-xl font-bold text-pretty'> Lista de productos</h2>
      </div>
      <div className='w-full overflow-x-auto shadow-md sm:rounded-lg flex flex-col justify-center items-center gap-2'>
        {
          InfoUsers != undefined && (
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
                  InfoUsers.map(user => {
                    return (
                      <Table.BodyRow key={user.Id} title={user.Id.toString()}>
                        <Table.Cell>
                          {user.First_Name + " " + user.Last_Name}
                        </Table.Cell>
                        <Table.Cell>
                          {user.email}
                        </Table.Cell>
                        <Table.Cell>
                          {
                            user.IdRole
                          }
                        </Table.Cell>
                        <Table.Cell>
                          <div className='w-full h-full flex flex-row justify-center items-center gap-2'>
                            <Button>
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
    </div>
  )
}
