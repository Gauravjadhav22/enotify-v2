import { Instance } from "@/types/instances"
import { axiosClient } from "@/lib/client"

export const getMyInstancesQuery = () => {
  return axiosClient.get<{
    error: boolean
    instances: Instance[]
  }>("/instances")
}

export const getChildInstancesQuery = () => {
  return axiosClient.get<{
    error: boolean
    instances: Instance[]
  }>("/instances/all")
}

export const createInstanceQuery = (data: {
  name: string
  userId?: string
}) => {
  return axiosClient.post<Instance>("/instances", {
    instanceName: data.name,
    loginType: "QRCODE",
    userID: data.userId,
  })
}

export const updateInstanceQuery = (data: Partial<Instance>) => {
  return axiosClient.patch<Instance>("/instances/" + data.id, data)
}
export const reconnectInstanceQuery = (data: Partial<Instance>) => {
  return axiosClient.patch<Instance>("/instances/" + data.id, data)
}

export const getResellerInstanceQuery = () => {
  return axiosClient.get<Instance>("/users/notifInstance")
}

export const getUserInstancesQuery = (userId: string) => {
  return axiosClient.get<Instance[]>("/users/" + userId + "/instances")
}

export const instanceDisconnectQuery = (instanceId: string) => {
  return axiosClient.delete("/instances/" + instanceId + "/disconnect")
}

export const instanceDeleteQuery = (instanceId: string) => {
  return axiosClient.delete("/instances/" + instanceId + "/delete")
}

export const deductInstanceQuotaQuery = (data: {
  instanceId: string
  quota: number
}) => {
  return axiosClient.put("/instances/" + data.instanceId + "/deductQuota", {
    quota: data.quota,
  })
}

export const setInstanceExpiryDateQuery = (data: {
  instanceId: string
  expiry: string
}) => {
  return axiosClient.put("/instances/" + data.instanceId + "/setExpiryDate", {
    expiryDate: data.expiry,
  })
}
