import { axiosClient } from "@/lib/client"

export const adminRechargeUserQuotaQuery = (data: {
  userId: string
  quota: number
  instance: string
}) => {
  return axiosClient.post("/recharge/admin/user/quota", data)
}

export const adminRechargeUserUnlimitedQuery = (data: {
  userId: string
  validityMonths: number
  instance: string
}) => {
  return axiosClient.post("/recharge/admin/user/unlimited", data)
}
