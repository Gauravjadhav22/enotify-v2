import { IFilterContext } from "@/context/filter.context"
// import JsFileDownloader from "js-file-downloader"

import {
  UserInboxResponse,
  WhatsAppSentMessageResponse,
} from "@/types/messages"
import { axiosClient } from "@/lib/client"

export const getUserInboxQuery = (data: {
  page: number
  size: number
  filter: IFilterContext
}) => {
  return axiosClient.get<UserInboxResponse>("/messages/inbox", {
    params: {
      page: data.page,
      limit: data.size,
      to: data.filter.timeRange.to != "" ? data.filter.timeRange.to : undefined,
      from:
        data.filter.timeRange.from != ""
          ? data.filter.timeRange.from
          : undefined,
      instances: data.filter.instances ? data.filter.instances : undefined,
      sender: data.filter.sender != "" ? data.filter.sender : undefined,
    },
  })
}

export const getInboxExportURL = (data: {
  page: number
  size: number
  filter: IFilterContext
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const params = new URLSearchParams({
    page: data.page.toString(),
    limit: data.size.toString(),
    to:
      data.filter.timeRange.to != ""
        ? data.filter.timeRange.to
        : new Date().toISOString(),
    from:
      data.filter.timeRange.from != ""
        ? data.filter.timeRange.from
        : new Date(0).toISOString(),
  })

  const url = `${baseUrl}/messages/inbox/export?${params.toString()}`

  return url
}

export const getUserOutboxQuery = (data: {
  page: number
  size: number
  filter: IFilterContext
}) =>
  axiosClient.get<WhatsAppSentMessageResponse>("/messages/outbox", {
    params: {
      page: data.page,
      limit: data.size,
      to: data.filter.timeRange.to != "" ? data.filter.timeRange.to : undefined,
      from:
        data.filter.timeRange.from != ""
          ? data.filter.timeRange.from
          : undefined,
      instances: data.filter.instances ? data.filter.instances : undefined,
      sender: data.filter.sender != "" ? data.filter.sender : undefined,
      status:
        data.filter.messageStatus.length > 0
          ? data.filter.messageStatus
          : undefined,
    },
  })

export const geOutboxExportURL = (data: {
  page: number
  size: number
  filter: IFilterContext
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  const params = new URLSearchParams({
    page: data.page.toString(),
    limit: data.size.toString(),
    to:
      data.filter.timeRange.to != ""
        ? data.filter.timeRange.to
        : new Date().toISOString(),
    from:
      data.filter.timeRange.from != ""
        ? data.filter.timeRange.from
        : new Date(0).toISOString(),
  })

  const url = `${baseUrl}/messages/outbox/export?${params.toString()}`

  return url
}

export const downloadMediaQuery = (messageId: string) => {}
