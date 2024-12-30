"use client"

import React, { useEffect } from "react"

import { WhiteLabelDataInterface } from "@/types/whitelabel"
import { axiosClient } from "@/lib/client"

const defaultWhiteLabelData: WhiteLabelDataInterface = {
  host: "enotify.app",
  logo: "https://enotify-assets.s3.ap-south-1.amazonaws.com/Enotify+App+Logo/Enotify.app+logo+(1).png",
  loginLogo:
    "https://enotify-assets.s3.ap-south-1.amazonaws.com/Enotify+App+Logo/Enotify.app+logo+black.png",
  name: "eNotify",
  primaryColor: "#1e88e5",
  defaultCountryCode: "91",
  marqueeText: "eNotify - Your Business Notification Partner",
  supportEmail: "support@enotify.app",
  supportNumber: "918483900678",
  timezone: "Asia/Kolkata",
  copyrightName: "Copyright @ Enotify",
}

export const WhiteLabelContext = React.createContext<WhiteLabelDataInterface>(
  defaultWhiteLabelData
)

interface WhiteLabelProviderProps {
  children: React.ReactNode
  defaultData?: WhiteLabelDataInterface
}

export const WhiteLabelProvider: React.FC<WhiteLabelProviderProps> = ({
  children,
  defaultData,
}) => {
  return (
    <WhiteLabelContext.Provider value={defaultData || defaultWhiteLabelData}>
      {children}
    </WhiteLabelContext.Provider>
  )
}

export const useWhiteLabel = () => {
  const context = React.useContext(WhiteLabelContext)
  if (context === undefined) {
    throw new Error("useWhiteLabel must be used within a WhiteLabelProvider")
  }
  return context
}
