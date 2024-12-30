import { useState } from 'react';
import useDialogState from '@/hooks/use-dialog-state';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { UsersActionDialog } from '@/components/dialog/users-action-dialog';
import { columns } from './components/transactions-columns';
import { UsersDeleteDialog } from '@/components/dialog/users-delete-dialog';
import { UsersInviteDialog } from '@/components/dialog/users-invite-dialog';
import { TransactionsData } from './data/transactions.ts';
import { CommonTable } from '@/components/table/table';
import { Transaction } from '@/types/transaction.ts';
import TransactionContextProvider, { TransactionDialogType } from './context/transactions-context.tsx';

export default function Transactions() {
  // Dialog states
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [open, setOpen] = useDialogState<TransactionDialogType>(null);

  // Parse transaction list
  const transactionsList: Transaction[] = TransactionsData as unknown as Transaction[];

  return (
    <TransactionContextProvider value={{ open, setOpen, currentTransaction, setCurrentTransaction }}>
      {/* ===== Top Heading ===== */}
      <Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground">
              Manage your Transactions here.
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <CommonTable
            columns={columns}
            data={transactionsList}
          />
        </div>
      </Main>

      <UsersInviteDialog
        key="user-invite"
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentTransaction && (
        <>
          <UsersActionDialog
            key={`transaction-edit-${currentTransaction.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit');
              setTimeout(() => {
                setCurrentTransaction(null);
              }, 500);
            }}
            currentRow={currentTransaction}
          />

          <UsersDeleteDialog
            key={`transaction-delete-${currentTransaction.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete');
              setTimeout(() => {
                setCurrentTransaction(null);
              }, 500);
            }}
            currentRow={currentTransaction}
          />
        </>
      )}
    </TransactionContextProvider>
  );
}
