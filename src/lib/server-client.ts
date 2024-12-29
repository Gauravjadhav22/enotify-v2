import { cookies as initCookies } from "next/headers"
import axios from "axios"

export function getServerAxiosClient() {
  const cookies = initCookies()
  const token = cookies.get("token")

  console.log("token", token?.value)

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  })
}
