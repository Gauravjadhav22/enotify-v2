import { axiosClient } from "@/lib/client"

export const sendTestTextMessageQuery = (data: {
  instance: string
  to: string
  message: string
}) => {
  return axiosClient.post("test-message/text", data)
}

export const sendLocationMessageQuery = (data: {
  instance: string
  to: string
  latitude: string
  longitude: string
  address: string
  locationName: string
}) => {
  return axiosClient.post("test-message/location", {
    instance: data.instance,
    to: data.to,
    lat: data.latitude,
    long: data.longitude,
    address: data.address,
    name: data.locationName,
  })
}

export const sendPollMessageQuery = (data: {
  instance: string
  to: string
  title: string
  options: string[]
  multiSelect: boolean
}) => {
  return axiosClient.post("test-message/poll", data)
}

export const sendTestContactMessageQuery = (data: {
  instance: string
  to: string
  displayName: string
  phoneNumber: string
  organization?: string
}) => {
  return axiosClient.post("test-message/contact", data)
}

export const sendMediaMessageQuery = (data: {
  file: File
  instance: string
  to: string
  caption?: string
}) => {
  const formData = new FormData()
  formData.append("file", data.file)

  return axiosClient.post("test-message/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      instance: data.instance,
      phone: data.to,
      caption: data.caption,
    },
  })
}
