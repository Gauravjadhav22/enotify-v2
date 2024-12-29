import { createLazyFileRoute } from '@tanstack/react-router'
import DeliveryReport from '@/features/delivery-report'

export const Route = createLazyFileRoute('/_authenticated/delivery-report/')({
  component: DeliveryReport,
})
