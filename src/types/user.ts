export type Role = "ADMIN" | "USER" | "RESELLER"
export type UserId = string

export interface User {
  id: string
  createdAt: string
  updatedAt: string
  phoneNumber: string
  password: string
  name: string
  role: Role
  userStatus: UserStatus
  timezone: string
  quota: number
  unlimitedMonths: number
  bulkMessageAllowed: boolean
  advancedApiAllowed: boolean
  rechargeType: string
  quotaValidity: string
  unlimitedValidity: string
  notificationId: string
  reseller: Reseller
  instanceCount?: number
  usersCount?: number
}

type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED"
export interface Reseller {
  id: string
  name: string
  phoneNumber: string
}

export interface UserDashboardData {
  instancesCount: number
  todayDelivered: number
  todayUsage: number
  todayFailed: number
  todayInQueue: number
  totalQueue: number
}

interface ChartItem {
  name: string
  submitted: number
  delivered: number
  failed: number
}

export interface ChartData {
  data: ChartItem[]
}

export type UserQueryData = {
  id: string
  name: string
  phoneNumber: string
  resellerId: string
  quota: number
  quotaValidity: string
  unlimitedValidity: string
  unlimitedMonths: number
  rechargeType: string
  role: Role
  userStatus: UserStatus
  reseller_name: string
  reseller_phone: string
}
