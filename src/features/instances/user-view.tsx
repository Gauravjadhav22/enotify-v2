"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import loading from "@/../public/illustrations/loading.svg"
import { getMyInstancesQuery } from "@/queries/instances"
import { useQuery } from "@tanstack/react-query"
import { GridIcon, ListIcon } from "lucide-react"

import { Instance } from "@/types/instances"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { RenderMenuButton } from "../menu-button"
import { RenderUserInstances } from "./render-instances"

export function UserViewInstances() {
  const { data, isLoading } = useQuery(["userInstances"], getMyInstancesQuery)
  const [searchTerm, setSearchTerm] = useState("")

  const instanceInSearch = (instance: Instance) => {
    if (searchTerm == "") {
      return true
    }

    return (
      instance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instance.connectedNumeber
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      instance.webhookUrl?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const allInstances = useMemo(
    () => data?.data.instances.filter(instanceInSearch),
    [data, isLoading, searchTerm]
  )

  const connected = useMemo(
    () => allInstances?.filter((instance) => instance.isLoggedIn),
    [data, isLoading]
  )

  const disconnected = useMemo(
    () => allInstances?.filter((instance) => !instance.isLoggedIn),
    [data]
  )

  const [layout, setLayout] = useState<"grid" | "list">("grid")

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center mt-16">
        <Image src={loading} alt="Loading image" className="w-80 h-80" />
        <h2 className="text-2xl font-bold mt-4 tracking-tighter">
          Loading instances...
        </h2>
      </div>
    )
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6">
        <div className="flex items-center">
          <RenderMenuButton></RenderMenuButton>
          <h2 className="text-3xl font-bold tracking-tight">Instances</h2>
        </div>
        <Tabs defaultValue="all">
          <TabsList defaultValue={"all"}>
            <TabsTrigger value="all">All accounts</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
            <TabsTrigger value="disconnected">Disconnected</TabsTrigger>
          </TabsList>

          <div className="flex flex-row justify-between align-middle mt-6">
            <Input
              type="text"
              placeholder="Search any instance..."
              className="w-72"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Tabs
              value={layout}
              onValueChange={(value) =>
                value && setLayout(value as "grid" | "list")
              }
            >
              <TabsList>
                <TabsTrigger value="grid">
                  <GridIcon className="w-5 h-5 mr-2"></GridIcon> Grid View
                </TabsTrigger>
                <TabsTrigger value="list">
                  <ListIcon className="w-5 h-5 mr-2"> </ListIcon> List View
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <TabsContent value="all">
            <RenderUserInstances
              isLoading={isLoading}
              instances={allInstances || []}
              layout={layout}
            ></RenderUserInstances>
          </TabsContent>
          <TabsContent value="connected">
            <RenderUserInstances
              isLoading={isLoading}
              instances={connected || []}
              layout={layout}
            ></RenderUserInstances>
          </TabsContent>
          <TabsContent value="disconnected">
            <RenderUserInstances
              isLoading={isLoading}
              instances={disconnected || []}
              layout={layout}
            ></RenderUserInstances>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
