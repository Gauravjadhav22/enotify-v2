export interface NodeServer {
  id: string
  name: string
  isWebhookActive: boolean
  maxCapacity: number
  instancesCount: number
  connected: number
  disconnected: number
  lastHeartbeat: string
  host: string
  port: number
  status: boolean
}

export type NodeServerList = NodeServer[]
