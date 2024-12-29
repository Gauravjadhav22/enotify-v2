import { User } from "./user"

export interface Instance {
  id: string
  name: string
  nodeId: string
  userId: string
  isNotifInstance: boolean
  loginType: string
  connectedNumeber: string
  inboxEnabled: boolean
  webhookEnabled: boolean
  webhookUrl: string
  deliveryEnabled: boolean
  deliveryUrl: string
  isLoggedIn: boolean
  quota: number
  webhookMode: "HTTP" | "WEBSOCKET"
  quotaValidity: string
  unlimitedValidity: string
  createdAt: string
  updatedAt: string
  user: User
  profilePicture?: string
  profileName?: string
  instanceUsage: number
  todayUsage: number
  attachMedia?: boolean
  qrcode?: string
}
