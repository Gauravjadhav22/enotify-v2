import { createLazyFileRoute } from '@tanstack/react-router'
import Apps from '@/features/apps'

export const Route = createLazyFileRoute('/_authenticated/api-documentation/')({
  component: Apps,
})
