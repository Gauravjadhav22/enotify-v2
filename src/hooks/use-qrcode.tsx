import { useEffect, useState } from "react"
import { usePusher } from "@harelpls/use-pusher"

import { axiosClient } from "@/lib/client"

export const useInstance = (onConnected: () => void) => {
  const [qrcode, setQrcode] = useState<string>()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [number, setNumber] = useState<string>()
  const { client } = usePusher()

  console.log("rerendering useInstance hook")

  const startListeners = (key: string) => {
    console.log("startListeners", key)
    const channel = client?.subscribe(key)

    channel?.bind("qrcodeUpdate", (data: string) => setQrcode(data))

    channel?.bind("connected", (data: string) => {
      setIsLoggedIn(true)
      setNumber(data || "")
    })
    channel?.bind("disconnected", () => setIsLoggedIn(false))
    channel?.bind("loggedOut", () => setIsLoggedIn(false))
  }

  useEffect(() => {
    if (isLoggedIn) {
      onConnected()
    }
  }, [isLoggedIn])

  return {
    qrcode,
    isLoggedIn,
    connectedNumber: number,
    async logout(key: string) {
      await axiosClient.post(`/instances/${key}/logout`)
      setIsLoggedIn(false)
      setQrcode(undefined)
    },
    startListeners,
  }
}
