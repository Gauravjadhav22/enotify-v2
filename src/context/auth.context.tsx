"use client"

import React, { createContext } from "react"
import { usePathname, useRouter } from "next/navigation"
import { getMe } from "@/queries/auth"
import { AxiosError } from "axios"
import { deleteCookie, getCookies, hasCookie, setCookie } from "cookies-next"

import { AuthResponse } from "@/types/auth"
import { User } from "@/types/user"
import { axiosClient } from "@/lib/client"

interface AuthContextInterface {
  isLoggedIn: boolean | null
  user: User | null
  token: string | null
  login: (phoneNumber: string, password: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = React.createContext<AuthContextInterface>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: async () => false,
  logout: () => "",
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(null)
  const [user, setUser] = React.useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null)

  const router = useRouter()

  const pathname = usePathname()

  React.useEffect(() => {
    if (
      pathname.includes("/auth") ||
      pathname.includes("/docs") ||
      pathname == "/"
    ) {
      return
    }

    if (hasCookie("token")) {
      const token = getCookies().token

      if (token) {
        setToken(token)
        setIsLoggedIn(true)

        getMe(token)
          .then((res) => {
            setUser(res.data)
          })
          .catch((err: AxiosError) => {
            if (err.response?.status == 401) {
              router.push("/auth/login")
            }
          })
      }
    } else {
      setIsLoggedIn(false)
      router.push("/auth/login")
    }
  }, [])

  const login = async (phoneNumber: string, password: string) => {
    const resp = await axiosClient.post<AuthResponse>("/auth/auth/login", {
      phoneNumber,
      password,
    })

    if (!resp.data) {
      return false
    }

    setCookie("token", resp.data.tokens.accessToken, {
      maxAge: 30 * 24 * 60 * 60,
    })
    setToken(resp.data.tokens.accessToken)
    setUser(resp.data.user)
    setIsLoggedIn(true)
    router.refresh()

    return true
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setIsLoggedIn(false)

    deleteCookie("token")

    router.push("/?logout=true")
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)

export default AuthContext
