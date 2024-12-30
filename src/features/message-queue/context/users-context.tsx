import React from 'react'
import { UserQueueItem } from '@/types/queue'

export type UsersDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface UsersContextType {
  open: UsersDialogType | null
  setOpen: (str: UsersDialogType | null) => void
  currentRow: UserQueueItem | null
  setCurrentRow: React.Dispatch<React.SetStateAction<UserQueueItem | null>>
}

const UsersContext = React.createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode
  value: UsersContextType
}

export default function UsersContextProvider({ children, value }: Props) {
  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUsersContext = () => {
  const usersContext = React.useContext(UsersContext)

  if (!usersContext) {
    throw new Error(
      'useUsersContext has to be used within <UsersContext.Provider>'
    )
  }

  return usersContext
}
