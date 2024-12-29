import { createLazyFileRoute } from '@tanstack/react-router'
import Transactions from '@/features/transactions'

export const Route = createLazyFileRoute('/_authenticated/transactions/')({
  component: Transactions,
})
