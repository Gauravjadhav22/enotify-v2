import { MessageType, proto } from "@whiskeysockets/baileys"

import { Instance } from "./instances"

export interface WhatsAppReceivedMessage {
  messageId: string
  messageType: string
  sender: string
  instanceId: string
  timestamp: string
  content: proto.Message
  isHistorySync: boolean
  fromMe: boolean
  receivingNumber: string
  senderName: string
  instance_name: string
  webhookStatus: string
}

export interface UserInboxResponse {
  results: WhatsAppReceivedMessage[]
  allInstances: Instance[]
  totalHits: number
  page: string
  size: string
}

type MessageTrigger =
  | "RECEIVED"
  | "NOTIFICATION"
  | "TEST_MESSAGE"
  | "BULK_MESSAGE"
  | "API"

export type WhatsAppMessageStatus =
  | "IN_QUEUE"
  | "SENT"
  | "DELIVERED"
  | "READ"
  | "FAILED"
  | "PENDING"
type FailedReason = "UNKNOWN" | "INVALID_NUMBER" | "TIMEOUT"

export interface WhatsAppSentMessage {
  messageId: string
  messageType: MessageType
  priority: number
  to: string
  instanceId: string
  trigger: MessageTrigger
  status: WhatsAppMessageStatus
  failedReason?: FailedReason
  timestamp: Date
  content: proto.Message
  sentTimestamp?: Date
  deliveredTimestamp?: Date
  readTimestamp?: Date
  senderNumber: string
  receiver?: string
  instanceName?: string
  userName: string
  userPhoneNumber: string
  sentFailedAt?:string|Date;
  deliveredReadAt?:string|Date;
  submittedAt?:string|Date;
}

export interface WhatsAppSentMessageResponse {
  results: WhatsAppSentMessage[]
  allInstances: Instance[]
  totalHits: number
  page: string
  size: string
}

