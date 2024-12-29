import { axiosClient } from "@/lib/client"

export const resellerRechargeResellerQuotaQuery = (data: {
  resellerId: string
  quota: number
}) => {
  return axiosClient.post("/recharge/reseller/reseller/quota", data)
}

export const resellerRechargeResellerUnlimitedQuery = (data: {
  resellerId: string
  validityMonths: number
}) => {
  return axiosClient.post("/recharge/reseller/reseller/unlimited", data)
}
