import React, { useState } from 'react';
import { IconMailPlus, IconUserPlus } from '@tabler/icons-react';
import useDialogState from '@/hooks/use-dialog-state';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import { columns } from './components/messages-columns.tsx';
import UsersContextProvider, { type UsersDialogType } from './context/users-context';
import { messages } from './data/messages.ts';
import { CommonTable } from '@/components/table/table';
import { WhatsAppSentMessage } from '@/types/messages.ts';

export default function Users() {
  // Dialog states
  const [currentRow, setCurrentRow] = useState<WhatsAppSentMessage | null>(null);
  const [open, setOpen] = useDialogState<UsersDialogType>(null);

  // Parse user list
  const messagesList: WhatsAppSentMessage[] = messages as unknown as WhatsAppSentMessage[];

  return (
    <UsersContextProvider value={{ open, setOpen, currentRow, setCurrentRow }}>
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
            <h2 className="text-2xl font-bold tracking-tight">WhatsApp Inbox</h2>
            <p className="text-muted-foreground"></p>
          </div>
          {/* Add buttons for additional functionality if needed */}
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          <CommonTable data={messagesList} columns={columns} />
        </div>
      </Main>
    </UsersContextProvider>
  );
}
