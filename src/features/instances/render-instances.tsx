"use client"

import { useAuth } from "@/context/auth.context"

import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import { CommonTable } from "@/components/table/table"

import { InstanceCard } from "./card"
import { NewInstanceDialog } from "./new-instance-dialog"
import { getUserColumns } from "./user-columns"

export interface RenderUserInstancesProps {
  instances: Instance[]
  isLoading: boolean
  layout: "grid" | "list"
}

export const RenderUserInstances: React.FC<RenderUserInstancesProps> = ({
  instances,
  isLoading,
  layout,
}) => {
  const { user } = useAuth()

  if (!isLoading && instances.length == 0) {
    return (
      <div className="flex justify-center flex-col items-center mt-16">
        {/* <img src={noUsers?.src} alt="Loading image" className="w-80 h-80" /> */}
        <h2 className="text-2xl font-bold mt-4 tracking-tighter">
          No instance found
        </h2>
        <p className="text-gray-500">
          Seems like you have not added any instances. Add new?
        </p>
        <NewInstanceDialog>
          <Button className="mt-4">Create my first instance</Button>
        </NewInstanceDialog>
      </div>
    )
  }

  if (layout == "list") {
    return (
      <CommonTable
        columns={getUserColumns(user as User)}
        data={instances}
      ></CommonTable>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3"
        >
          {instances.map((instance) => (
            <InstanceCard
              key={instance.id}
              instance={instance}
              user={user as User}
            ></InstanceCard>
          ))}
        </ul>
      </div>
    </>
  )
}
