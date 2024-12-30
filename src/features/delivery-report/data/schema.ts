import { z } from 'zod'

const messageSchema = z.object({
  messageId: z.string().uuid(), 
  instanceName: z.string(),
  receiver: z.string().email(), 
  // type: z.literal('SMS' | 'Email' | 'Push Notification'), 
  type: z.string(), 
  content: z.string(),
  status: z.union([
    z.literal('pending'),
    z.literal('sent'),
    z.literal('failed'),
    z.literal('delivered'),
    z.literal('read'),
  ]),
  submittedAt: z.string().datetime(),
  sentFailedAt: z.string().datetime().nullable().optional(),
  deliveredReadAt: z.string().datetime().nullable().optional(),
})

export type Report = z.infer<typeof messageSchema>
export const ReportListSchema = z.array(messageSchema)