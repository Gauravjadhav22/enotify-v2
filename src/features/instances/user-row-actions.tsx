"use client"

import { useState } from "react"
import { instanceDisconnectQuery } from "@/queries/instances"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Row } from "@tanstack/react-table"

import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { LogoutInstanceDialog } from "./logout-dialog"
import { ReconenctInstanceDialog } from "./reconnect"
import { SettingsDialog } from "./settings-dialog"
import { TestMessageDialog } from "./test-message"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function UserRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const instance = row.original as Instance
  const [reconnectOpen, setReconnectOpen] = useState(false)
  const queryClient = useQueryClient()

  const handleReconnect = async () => {
    setReconnectOpen(true)
  }

  const disconnectInstanceMutation = useMutation(instanceDisconnectQuery)

  const disconnectInstance = async () => {
    disconnectInstanceMutation.mutate(instance.id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInstances"])
        queryClient.refetchQueries(["userInstances"])
      },
    })
  }

  return (
    <DropdownMenu>
      <ReconenctInstanceDialog
        instanceKey={instance.id}
        open={reconnectOpen}
        onClose={() => setReconnectOpen(false)}
        onConnected={() => {
          setReconnectOpen(false)
        }}
      />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={instance.isLoggedIn ? disconnectInstance : handleReconnect}
        >
          {instance.isLoggedIn ? "Disconnect" : "Scan WhatsApp"}
        </DropdownMenuItem>
        <TestMessageDialog instance={instance}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Send test message
          </DropdownMenuItem>
        </TestMessageDialog>
        <Separator></Separator>
        <SettingsDialog instance={instance}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Settings
          </DropdownMenuItem>
        </SettingsDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
