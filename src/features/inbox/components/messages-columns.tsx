import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import LongText from '@/components/long-text'
import { callTypes } from '../data/data.ts'
import { Report } from '../data/schema.ts'
import { DataTableColumnHeader } from './data-table-column-header.tsx'
import { WhatsAppSentMessage } from '@/types/messages'
import { reports } from '../data/messages.ts'
export const columns: ColumnDef<WhatsAppSentMessage>[] = [
  {
    accessorKey: 'messageId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Message ID" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">
        {row.original?.messageId || 'N/A'}
      </LongText>
    ),
  },
  {
    accessorKey: 'instanceName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance Name" />
    ),
    cell: ({ row }) => (
      <LongText className="max-w-36">
        {row.original?.instanceName || 'N/A'}
      </LongText>
    ),
  },
  {
    accessorKey: 'receiver',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Receiver" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.receiver || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Content" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.content || 'N/A'}</div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original?.status || 'unknown';
      const badgeColor = callTypes.get(status) || 'default';
      return (
        <Badge variant="outline" className={cn('capitalize', badgeColor)}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'submittedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Submitted At" />
    ),
    cell: ({ row }) => <div>{row.original?.submittedAt.toLocaleString()}</div>,
  },
  {
    accessorKey: 'sentFailedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent/Failed At" />
    ),
    cell: ({ row }) => <div>{row.original?.sentFailedAt.toLocaleString()}</div>,
  },
  {
    accessorKey: 'deliveredReadAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivered/Read At" />
    ),
    cell: ({ row }) => (
      <div>{row.original?.deliveredReadAt.toLocaleString()}</div>
    ),
  },
];

