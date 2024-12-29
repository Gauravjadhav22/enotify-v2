import * as z from "zod"

import { Instance } from "./instances"

export const campaignDetailsSchema = z.object({
  name: z.string().nonempty("Name is required."),
  instance: z.string().nonempty("Instance is required."),
  tags: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    )
    .optional(),
})

export type CampaignDetails = z.infer<typeof campaignDetailsSchema>

export interface MediaKeys {
  directPath: string
  fileEncSha256: Uint8Array
  fileLength: number
  fileName: string
  fileSha256: Uint8Array
  jpegThumbnail: Uint8Array
  mediaKey: Uint8Array
  mimetype: string
  url: string
}

export interface IBroadcastMessage {
  phoneNumber: string
  message: string
}

export interface IStartCampaign {
  campaignName: string
  instanceId: string
  messages: IBroadcastMessage[]
  description?: string
  tags?: string[]
  schedule?: string
}

export interface BroadcastData {
  id: string
  userId: string
  name: string
  isScheduled: boolean
  schedule: string
  createdAt: string
  description: string
  tags?: string[]
  instance?: Instance
  stats: Stats
  campaignStatus: "running" | "completed"
  messagesCount: number
}

interface Stats {
  inQueue: number
  success: number
  failed: number
}
