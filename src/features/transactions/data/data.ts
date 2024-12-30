import {
  IconCash,
  IconShield,
  IconUsersGroup,
  IconUserShield,
} from '@tabler/icons-react'

export const messageTypes = new Map<string, string>([
  ['SMS', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['Email', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['Push Notification', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
])
export const callTypes = new Map<string, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])
export const messageStatuses = new Map<string, string>([
  ['pending', 'bg-yellow-100/30 text-yellow-900 dark:text-yellow-200 border-yellow-200'],
  ['sent', 'bg-green-100/30 text-green-900 dark:text-green-200 border-green-200'],
  ['failed', 'bg-red-100/30 text-red-900 dark:text-red-200 border-red-200'],
  ['delivered', 'bg-blue-100/30 text-blue-900 dark:text-blue-200 border-blue-200'],
  ['read', 'bg-purple-100/30 text-purple-900 dark:text-purple-200 border-purple-200'],
])

// No need for userTypes as they are not relevant to message data
export const userTypes = [
  {
    label: 'Superadmin',
    value: 'superadmin',
    icon: IconShield,
  },
  {
    label: 'Admin',
    value: 'admin',
    icon: IconUserShield,
  },
  {
    label: 'Manager',
    value: 'manager',
    icon: IconUsersGroup,
  },
  {
    label: 'Cashier',
    value: 'cashier',
    icon: IconCash,
  },
] as const
