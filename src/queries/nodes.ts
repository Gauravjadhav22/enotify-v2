import { axiosClient } from "@/lib/client"

export const getNodes = () => {
  return axiosClient.get("/nodes")
}
