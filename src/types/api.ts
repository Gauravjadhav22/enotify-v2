import { AxiosError } from "axios"

export type APIError = AxiosError<{
  message: string
  statusCode: number
}>
