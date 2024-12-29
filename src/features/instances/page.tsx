import { Metadata } from "next"

import { getServerSession } from "@/lib/session"

import { AdminResellerView } from "./admin-reseller-view"
import { UserViewInstances } from "./user-view"

export const metadata: Metadata = {
  title: "Instances",
  description: "User instances.",
}

export default async function DashboardPage() {
  const user = await getServerSession()

  return user?.role == "USER" ? (
    <UserViewInstances></UserViewInstances>
  ) : (
    <AdminResellerView></AdminResellerView>
  )
}
