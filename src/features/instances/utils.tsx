import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { JSX } from "react"

const date = new Date()

const InfinityIcon = () => <span className="text-3xl mb-0">∞</span>

const dateGreaterThanToday = (d: string) => {
  const date = new Date(d)
  return date.getTime() > new Date().getTime()
}

function dateFormat(d: string) {
  // 2021-08-31T18:30:00.000Z to 31 Aug 2021
  const date = new Date(d)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

const getExpiry = (instance: Instance, user: User) => {
  let quota = new Date()
  let unlimitedValidity = new Date()

  if (user?.rechargeType == "INSTANCE") {
    quota = new Date(instance.quotaValidity || "")
    unlimitedValidity = new Date(instance.unlimitedValidity || "")
  } else {
    quota = new Date(user?.quotaValidity || "")
    unlimitedValidity = new Date(user?.unlimitedValidity || "")
  }

  // return the bigger date
  return quota.getTime() > unlimitedValidity.getTime()
    ? quota
    : unlimitedValidity
}

const checkInstanceExpired = (instance: Instance, user: User) => {
  // get date difference in days
  const dateDiff = new Date(
    getExpiry(instance, user).getTime() - date.getTime()
  ).getDate()

  if (dateDiff < 15) {
    return true
  }
}

const checkUserExpired = (user: User) => {
  const userExpiry = new Date(user?.quotaValidity || "")

  const dateDiff = new Date(userExpiry.getTime() - date.getTime()).getDate()

  if (dateDiff < 15 && (user?.quota || 0) < 1000) {
    return true
  }
}

export const instanceIsExpiring = (instance: Instance, user: User) => {
  const isExpiring =
    user?.rechargeType == "USER"
      ? checkUserExpired(user)
      : checkInstanceExpired(instance, user)

  return isExpiring
}

export const getInstanceQuota = (instance: Instance, user: User) => {
  let quota: number | JSX.Element = 0

  if (user?.rechargeType == "USER") {
    if (user?.quota) {
      quota = user?.quota
      if (new Date(user?.quotaValidity || "").getTime() < date.getTime()) {
        quota = 0
      }
    } else {
      quota = 0
    }
  } else if (user?.rechargeType == "INSTANCE") {
    if (instance.isNotifInstance) {
      quota = <InfinityIcon />
    } else if (
      instance.unlimitedValidity &&
      dateGreaterThanToday(instance.unlimitedValidity)
    ) {
      quota = <InfinityIcon />
    } else {
      quota = instance.quota

      if (new Date(instance.quotaValidity || "").getTime() < date.getTime()) {
        quota = 0
      }
    }
  }

  return quota
}

export const getInstanceExpiryDate = (instance: Instance, user: User) => {
  let expiryDate: string | JSX.Element = ""

  if (user?.rechargeType == "INSTANCE") {
    if (instance.isNotifInstance) {
      expiryDate = <InfinityIcon />
    } else if (instance.unlimitedValidity) {
      expiryDate = dateFormat(
        instance.unlimitedValidity || instance.quotaValidity
      )
    } else {
      expiryDate = dateFormat(
        instance.quotaValidity || instance.unlimitedValidity
      )
    }
  } else {
    if (user?.quotaValidity) {
      expiryDate = dateFormat(user?.quotaValidity)
    } else {
      expiryDate = <InfinityIcon />
    }
  }

  return expiryDate
}
