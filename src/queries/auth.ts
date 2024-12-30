import { User } from "@/types/user"
import { axiosClient } from "@/lib/client"

export const getMe = (token: string) => {
  return axiosClient.get<User>("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const registerUser = (data: {
  name: string
  phoneNumber: string
  password: string
}) => {
  return axiosClient.post<{
    accessToken: string
    refreshToken: string
  }>("/auth/auth/register", data)
}
