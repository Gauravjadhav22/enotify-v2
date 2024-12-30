import { ChartData, UserDashboardData, UserQueryData } from "@/types/user"
import { axiosClient } from "@/lib/client"

export const getUsersQuery = () => {
  return axiosClient.get<UserQueryData[]>("/users")
}

export interface AddUserQueryParams {
  name?: string
  phoneNumber?: string
  password?: string
  role?: string
}

export interface UpdateUserQueryParams extends AddUserQueryParams {
  id: string
  isActive?: boolean
  notificationId: string
  userRechargeType?: "INSTANCE" | "USER"
}

export const addUserQuery = (data: AddUserQueryParams) => {
  return axiosClient.post("/users", data)
}

export const updateUserQuery = (data: UpdateUserQueryParams) => {
  return axiosClient.patch(`/users/${data.id}`, {
    ...data,
    id: undefined, // remove id from data
  })
}

export const deleteUserQuery = (id: string) => {
  return axiosClient.delete(`/users/${id}`)
}

export const changeUserStatusQuery = (data: { id: string; status: string }) => {
  return axiosClient.put(`/users/${data.id}/status?status=${data.status}`)
}

export const changeUserTypeQuery = (data: { id: string }) => {
  return axiosClient.put(`/users/${data.id}/type`)
}

export const getDashboardData = () => {
  return axiosClient.get<{
    resellerCount: number
    userCount: number
    instancesCount: number
  }>("/users/dashboard")
}

export const deleteUser = (userId: string) => {
  return axiosClient.delete(`/users/${userId}`)
}

export const getUserDashboardData = () => {
  return axiosClient.get<UserDashboardData>("/users/user/dashboard")
}

export const getAdminOrResellerDashboardData = () => {
  return axiosClient.get<UserDashboardData>("/users/reseller/dashboard")
}

export const getChartData = () =>
  axiosClient.get<ChartData>("/users/reseller/dashboard/chart")

export const upgradeUserRole = (userId: string) =>
  axiosClient.patch(`/users/${userId}/upgrade`)

export const changeResellerQuery = (data: {
  id: string
  resellerId: string
}) => {
  return axiosClient.patch(`/users/${data.id}/reseller`, {
    newResellerID: data.resellerId,
    userID: data.id,
  })
}

export const deductUserQuotaQuery = (data: {
  userId: string
  quota: number
}) => {
  return axiosClient.put("/users/" + data.userId + "/deductQuota", {
    quota: data.quota,
  })
}

export const setUserExpiryDateQuery = (data: {
  userId: string
  expiry: string
}) => {
  return axiosClient.put("/users/" + data.userId + "/setExpiryDate", {
    expiryDate: data.expiry,
  })
}

export const resellerDebitMonthsQuery = (data: {
  userId: string
  months: number
}) => {
  return axiosClient.put("/users/" + data.userId + "/deductUnlimitedMonths", {
    months: data.months,
  })
}
