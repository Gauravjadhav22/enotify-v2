import { Transaction } from '@/types/transaction.ts'
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import LongText from '@/components/long-text';
import { DataTableColumnHeader } from './data-table-column-header.tsx';
import { Transaction } from '@/types/transaction.ts';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Transaction ID" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">{row.original?.id || 'N/A'}</LongText>
    ),
  },
  {
    accessorKey: 'fromUserId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From User ID" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.fromUserId || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'toUserId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To User ID" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.toUserId || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.amount.toFixed(2) || '0.00'}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className={cn('capitalize')}>
        {row.original?.type || 'N/A'}
      </Badge>
    ),
  },
  {
    accessorKey: 'unlimitedMonths',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unlimited Months" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.unlimitedMonths || '0'}</div>
    ),
  },
  {
    accessorKey: 'timestamp',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Timestamp" />
    ),
    cell: ({ row }) => (
      <div>{new Date(row.original?.timestamp).toLocaleString() || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'toUser.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To User Name" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.toUser?.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'fromUser.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From User Name" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.fromUser?.name || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'instance.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance Name" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">
        {row.original?.instance?.name || 'N/A'}
      </LongText>
    ),
  },
];


