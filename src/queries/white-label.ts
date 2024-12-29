import { WhiteLabelDataInterface } from "@/types/whitelabel"
import { axiosClient } from "@/lib/client"

export const getOwnWhiteLabelData = async () =>
  axiosClient.get<WhiteLabelDataInterface>("/whitelabel/settings")

export const updateWhiteLabelData = async (
  data: Partial<WhiteLabelDataInterface>
) => axiosClient.patch<WhiteLabelDataInterface>("/whitelabel/settings", data)

export const uploadLogo = async ({
  file,
  type,
}: {
  file: File
  type: "login" | "default"
}) => {
  const formData = new FormData()
  formData.append("file", file)

  return axiosClient.post(`/whitelabel/settings/logo?type=${type}`, formData)
}
