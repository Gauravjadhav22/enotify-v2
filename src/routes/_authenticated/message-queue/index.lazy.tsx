import { createLazyFileRoute } from '@tanstack/react-router'
import MesssageQueue from '@/features/message-queue'

export const Route = createLazyFileRoute('/_authenticated/message-queue/')({
  component: MesssageQueue,
})
