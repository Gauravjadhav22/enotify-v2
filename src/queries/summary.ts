import { axiosClient } from "@/lib/client"

export interface SummaryData {
  date: string
  isCurrentMonth: boolean
  events: unknown[]
}

export const getSummaryQuery = () => {
  return axiosClient.get<unknown[]>("/summary")
}
