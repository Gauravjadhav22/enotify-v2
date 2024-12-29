import { axiosClient } from "@/lib/client"

export const adminRechargeResellerQuotaQuery = (data: {
  resellerId: string
  quota: number
}) => {
  return axiosClient.post("/recharge/admin/reseller/quota", data)
}

export const adminRechargeResellerUnlimitedQuery = (data: {
  resellerId: string
  validityMonths: number
}) => {
  return axiosClient.post("/recharge/admin/reseller/unlimited", data)
}
