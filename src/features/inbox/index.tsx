import { useState } from 'react'
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react'
import useDialogState from '@/hooks/use-dialog-state'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/messages-columns.tsx'
import { UsersTable } from './components/users-table'
import UsersContextProvider, {
  type UsersDialogType,
} from './context/users-context'
import { Report, ReportListSchema } from './data/schema.ts'
import { messages } from './data/messages.ts'
import { CommonTable } from '@/components/table/table'
import { WhatsAppSentMessage } from '@/types/messages.ts'

export default function Users() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Report | null>(null)
  const [open, setOpen] = useDialogState<UsersDialogType>(null)

  // Parse user list
  // const userList = userListSchema.parse(messages)

  const messagesList: WhatsAppSentMessage[] = messages  as WhatsAppSentMessage[]

  return (
    <UsersContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {/* ===== Top Heading ===== */}
      <Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>WhatsApp Inbox</h2>
            <p className='text-muted-foreground'>
            </p>
          </div>
          {/* <div className='flex gap-2'>
            <Button
              variant='outline'
              className='space-x-1'
              onClick={() => setOpen('invite')}
            >
              <span>Invite User</span> <IconMailPlus size={18} />
            </Button>
            <Button className='space-x-1' onClick={() => setOpen('add')}>
              <span>Add User</span> <IconUserPlus size={18} />
            </Button>
          </div> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CommonTable data={messagesList} columns={columns} />
        </div>
      </Main>

    </UsersContextProvider>
  )
}
