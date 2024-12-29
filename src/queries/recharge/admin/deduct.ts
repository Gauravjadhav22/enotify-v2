import { axiosClient } from "@/lib/client"

export const adminDeductUserBalanceQuery = (data: {
  userId: string
  deductType: "quota" | "vaildity" | "unlimited"
  quota?: number
  newValidityDate?: string
  instance?: string
}) => {
  return axiosClient.post("/recharge/user/deduct", data)
}

export const adminDeductResellerBalanceQuery = (data: {
  userId: string
  deductType: "quota" | "unlimited"
  quota?: number
  unlimitedMonths: number
}) => {
  return axiosClient.post("/recharge/reseller/deduct", data)
}
