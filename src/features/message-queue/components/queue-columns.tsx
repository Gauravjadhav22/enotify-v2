import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from './data-table-column-header.tsx';
import { UserQueueItem } from '@/types/queue.tsx';

export const columns: ColumnDef<UserQueueItem>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.id || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'user.reseller.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reseller" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.user.reseller.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.user.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'profileName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.profileName || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'connectedNumeber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance Key" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.connectedNumeber || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'isLoggedIn',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Connection State" />
    ),
    cell: ({ row }) => {
      const isLoggedIn = row.original?.isLoggedIn ? 'Connected' : 'Disconnected';
      return (
        <Badge variant="outline" className={cn('capitalize')}>
          {isLoggedIn}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Queue Date" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original?.date).toLocaleString() || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'queueCount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Queue Count" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.queueCount || 0}</div>
    ),
  },
];
