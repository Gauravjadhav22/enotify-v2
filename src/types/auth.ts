import { User } from "./user"

export interface AuthResponse {
  tokens: {
    accessToken: string
    refreshToken: string
  }
  user: User
}
