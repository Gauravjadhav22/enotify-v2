import { Role } from "./user"

export interface ITransactionType {
  QUOTA: "QUOTA"
  UNLIMITED: "UNLIMITED"
  VOUCHER_TRANSFER: "VOUCHER_TRANSFER"
}

export type TransactionType = keyof ITransactionType

export interface Transaction {
  id: string
  fromUserId: string
  toUserId: string
  amount: number
  type: TransactionType
  unlimitedMonths: number
  unlimitedVoucherId?: any
  timestamp: string
  toUser?: TxUser
  fromUser?: TxUser
  instanceId?: string
  instance?: {
    id: string
    name: string
  }
}

export interface TxUser {
  id: string
  role: Role
  name: string
  phoneNumber: string
}
