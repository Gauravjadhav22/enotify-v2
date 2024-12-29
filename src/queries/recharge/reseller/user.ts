import { axiosClient } from "@/lib/client"

export const resellerRechargeUserQuotaQuery = (data: {
  userId: string
  quota: number
  instance: string
}) => {
  return axiosClient.post("/recharge/reseller/user/quota", data)
}

export const resellerRechargeUserUnlimitedQuery = (data: {
  userId: string
  validityMonths: number
  instance: string
}) => {
  return axiosClient.post("/recharge/reseller/user/unlimited", data)
}
