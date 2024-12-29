import { cookies as initCookies } from "next/headers"
import { getMe } from "@/queries/auth"

export const getServerSession = async () => {
  const cookies = initCookies()
  const token = cookies.get("token")

  if (!token) {
    return null
  }

  const user = await getMe(token.value)
  return user.data
}
