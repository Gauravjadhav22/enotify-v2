import { createLazyFileRoute } from '@tanstack/react-router'
import Instances  from '@/features/instances'
// import ComingSoon from '@/components/coming-soon'

export const Route = createLazyFileRoute('/_authenticated/instances/')({
  component: Instances,
})
