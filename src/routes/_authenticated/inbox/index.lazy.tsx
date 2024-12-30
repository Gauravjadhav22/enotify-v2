import { createLazyFileRoute } from '@tanstack/react-router'
import Inbox from '@/features/inbox'

export const Route = createLazyFileRoute('/_authenticated/inbox/')({
  component: Inbox,
})
