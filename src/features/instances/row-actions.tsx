"use client"

import React from "react"
import { useAuth } from "@/context/auth.context"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Instance } from "@/types/instances"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DebitSuperUserDialog } from "./debit-dialog"
import { DeleteInstanceDialog } from "./delete-dialog"
import { LogoutInstanceDialog } from "./logout-dialog"
import { SettingsDialog } from "./settings-dialog"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const instance = row.original as Instance
  const [open, setOpen] = React.useState(false)
  const { user } = useAuth()

  return (
    <DropdownMenu>
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
        <LogoutInstanceDialog instance={{} as Instance}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Logout
          </DropdownMenuItem>
        </LogoutInstanceDialog>
        <DeleteInstanceDialog instance={instance}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Delete instance
          </DropdownMenuItem>
        </DeleteInstanceDialog>

        {user?.role == "ADMIN" && (
          <DebitSuperUserDialog
            instance={instance}
            onOpenChange={setOpen}
            open={open}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Debit instance
            </DropdownMenuItem>
          </DebitSuperUserDialog>
        )}

        <SettingsDialog instance={instance}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Settings
          </DropdownMenuItem>
        </SettingsDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
