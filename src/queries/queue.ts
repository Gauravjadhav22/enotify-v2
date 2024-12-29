import { UserQueueResponse } from "@/types/queue"
import { axiosClient } from "@/lib/client"

export const getUserMessageQueueQuery = () =>
  axiosClient.get<UserQueueResponse>("messages/messageQueue")

export const failMessageQueueQuery = (data: {
  instanceId: string
  date: string
}) => axiosClient.get("messages/queue/cancel", { params: data })
