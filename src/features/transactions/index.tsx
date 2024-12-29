import { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { UsersActionDialog } from '@/components/dialog/users-action-dialog'
import { columns } from './components/transactions-columns'
import { UsersDeleteDialog } from '@/components/dialog/users-delete-dialog'
import { UsersInviteDialog } from '@/components/dialog/users-invite-dialog'
import UsersContextProvider, {
  type UsersDialogType,
} from './context/users-context'
import { TransactionsData } from './data/transactions.ts'
import { CommonTable } from '@/components/table/table'
import {Transaction} from '@/types/transaction.ts'
export default function Transactions() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<Transaction | null>(null)
  const [open, setOpen] = useDialogState<UsersDialogType>(null)

  // Parse user list
  const transactionsList: Transaction[] = TransactionsData  as Transaction[]

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
            <h2 className='text-2xl font-bold tracking-tight'>Transactions</h2>
            <p className='text-muted-foreground'>
              Manage your Transactions here.
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
          </div> */}
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <CommonTable 
            columns={columns} 
            data={transactionsList} 
          />
        </div>
      </Main>

      <UsersActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <UsersInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </UsersContextProvider>
  )
}
