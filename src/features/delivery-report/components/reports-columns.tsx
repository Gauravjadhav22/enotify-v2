import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import LongText from '@/components/long-text';
import { DataTableColumnHeader } from './data-table-column-header';
import { WhatsAppSentMessage } from '@/types/messages';

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
      const badgeColor =
        {
          pending: 'yellow',
          sent: 'blue',
          failed: 'red',
          delivered: 'green',
          read: 'purple',
        }[status] || 'default';
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
    cell: ({ row }) => {
      const submittedAt = row.original?.submittedAt
        ? new Date(row.original.submittedAt)
        : null;
      return <div>{submittedAt ? submittedAt.toLocaleString() : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'sentFailedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sent/Failed At" />
    ),
    cell: ({ row }) => {
      const sentFailedAt = row.original?.sentFailedAt
        ? new Date(row.original.sentFailedAt)
        : null;
      return <div>{sentFailedAt ? sentFailedAt.toLocaleString() : 'N/A'}</div>;
    },
  },
  {
    accessorKey: 'deliveredReadAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivered/Read At" />
    ),
    cell: ({ row }) => {
      const deliveredReadAt = row.original?.deliveredReadAt
        ? new Date(row.original.deliveredReadAt)
        : null;
      return (
        <div>{deliveredReadAt ? deliveredReadAt.toLocaleString() : 'N/A'}</div>
      );
    },
  },
];
