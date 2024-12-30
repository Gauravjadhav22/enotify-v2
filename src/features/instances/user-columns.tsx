"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Instance } from "@/types/instances"
import { User } from "@/types/user"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

import { UserRowActions } from "./user-row-actions"
import {
  getInstanceExpiryDate,
  getInstanceQuota,
  instanceIsExpiring,
} from "./utils"

export const formatDate = (ts: string) => {
  const creationTime = new Date(ts)
  const date = new Date(ts).getDate()

  const month = creationTime.toLocaleString("default", { month: "short" })
  const year = creationTime.getFullYear()

  return `${date} ${month}, ${year}`
}

export const getUserColumns = (user: User) => {
  const userColumns: ColumnDef<Instance>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => {
        let id = row.getValue("id") as string
        // trim id to 5 characters
        id = "#" + id.substring(2, 8)
        return <div className="w-[80px]">{id}</div>
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Instance name"
          className="ml-12"
        />
      ),
      cell: ({ row }) => {
        const id = row.original.id
        const pic = row.original.profilePicture
        return (
          <div className="flex space-x-2">
            <Avatar className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 bg-transparent">
              <AvatarImage src={pic}></AvatarImage>
              <AvatarFallback className="bg-transparent">
                <div className="bg-transparent"></div>
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("name")}{" "}
                {instanceIsExpiring(row.original, user) ? (
                  <Badge variant={"danger-outline"} className="ml-2">
                    Expiring soon
                  </Badge>
                ) : (
                  ""
                )}
              </span>
              <span className="text-xs text-gray-500">{id}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "quota",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Remaining credits" />
      ),
      cell: ({ row }) => {
        const instance = row.original

        return (
          <div className="flex">
            <span className="max-w-[500px] truncate font-medium">
              {getInstanceQuota(instance, user)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "unlimitedValidity",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Expiry date" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {getInstanceExpiryDate(row.original, user)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "connectedNumeber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Connected number" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("connectedNumeber") || ("_" as string)}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: "isLoggedIn",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Connection" />
      ),
      cell: ({ row }) => {
        // capitalize first letter and small letters for the rest
        const capitalize = (s: string) => {
          if (typeof s !== "string") return ""
          return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
        }

        return (
          <div className="flex space-x-2">
            <Badge
              variant={
                row.getValue("isLoggedIn") ? "default" : "danger-outline"
              }
            >
              {capitalize(
                row.getValue("isLoggedIn") == true
                  ? "Connected"
                  : "Disconnected"
              )}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(
          row.getValue("isLoggedIn") == true ? "true" : "false"
        )
      },
    },
    {
      accessorKey: "webhookEnabled",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Webhook" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <Badge
              variant={
                row.getValue("webhookEnabled") == true
                  ? "default"
                  : "danger-outline"
              }
            >
              {row.getValue("webhookEnabled") == true
                ? "Enabled"
                : "Not enabled"}
            </Badge>
          </div>
        )
      },
      filterFn: (row, id, filterValue) => {
        return filterValue.includes(
          row.getValue("isActive") == true ? "true" : "false"
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Creation time" />
      ),
      cell: ({ row }) => {
        const creationTime = formatDate(row.getValue("createdAt"))

        // change the date format to 31 Aug, 2003

        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {creationTime}
            </span>
          </div>
        )
      },
      sortingFn: (row, id, direction) => {
        const creationTime = new Date(row.getValue("createdAt"))
        return direction === "asc"
          ? creationTime.getTime()
          : -creationTime.getTime()
      },
    },

    {
      id: "actions",
      cell: ({ row }) => <UserRowActions row={row} />,
    },
  ]

  return userColumns
}
