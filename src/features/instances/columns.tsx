"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Instance } from "@/types/instances"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

import { DataTableRowActions } from "./row-actions"
import { getInstanceQuota } from "./utils"

export const formatDate = (ts: string) => {
  const creationTime = new Date(ts)
  const date = new Date(ts).getDate()

  const month = creationTime.toLocaleString("default", { month: "short" })
  const year = creationTime.getFullYear()

  return `${date} ${month}, ${year}`
}

export const columns: ColumnDef<Instance>[] = [
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
    accessorKey: "resellerId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reseller" />
    ),
    filterFn: (row, id, filterValue) => {
      return filterValue.includes(row.getValue("user.resellerId"))
    },
    cell: ({ row }) => {
      const reseller = row.original.user.reseller.name

      return (
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="max-w-[500px] truncate font-medium">
              {reseller}
            </span>

            <span className="text-xs text-gray-500 truncate">
              {row.original.user.reseller.phoneNumber}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.user.name + row.user.phoneNumber,
    id: "user.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    filterFn: (row, id, filterValue) => {
      const name = row.original.user.name
      const phoneNumber = row.original.user.phoneNumber
      return (
        name.includes(filterValue) ||
        filterValue.includes(name) ||
        phoneNumber.includes(filterValue) ||
        filterValue.includes(phoneNumber)
      )
    },
    cell: ({ row }) => {
      const reseller = row.original.user.name

      return (
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="max-w-[500px] truncate font-medium">
              {reseller}
            </span>

            <span className="text-xs text-gray-500 truncate">
              {row.original.user.phoneNumber}
            </span>
          </div>
        </div>
      )
    },
  },
  {
    id: "name",
    accessorFn: (row) => row.name + row.user.name,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance name" />
    ),
    filterFn: (row, id, value) => {
      const name = row.original.name
      const phoneNumber = row.original.user.name
      const userName = row.original.user.phoneNumber

      return (
        value.includes(name) ||
        value.includes(phoneNumber) ||
        name.includes(value) ||
        phoneNumber.includes(value) ||
        value.includes(userName) ||
        userName.includes(value)
      )
    },
    cell: ({ row }) => {
      const connectedNumber = row.original.id

      const toast = useToast()

      const copyId = () => {
        navigator.clipboard.writeText(connectedNumber)
        toast.toast({
          variant: "default",
          title: "Copied to clipboard",
          description: "Instance ID copied to clipboard",
        })
      }

      const first6 = connectedNumber.substring(0, 9)

      return (
        <div className="flex space-x-2">
          <div className="flex flex-col justify-start items-start">
            <span className="max-w-[500px] truncate font-medium">
              {row.original.name}
            </span>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  className="text-xs text-gray-500"
                  variant="text"
                  onClick={copyId}
                >
                  {first6}...
                </Button>
              </TooltipTrigger>
              <TooltipContent>{connectedNumber} (Click to copy)</TooltipContent>
            </Tooltip>
          </div>
        </div>
      )
    },
  },
  {
    id: "connectionDetails",
    accessorKey: "connectedNumeber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Connection" />
    ),
    cell: ({ row }) => {
      const isLoggedIn = row.original.isLoggedIn
      const profileName = row.original.profileName
      const connectedNumber = row.original.connectedNumeber
      return isLoggedIn ? (
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="max-w-[500px] truncate font-medium">
              {profileName}
            </span>
            <span className="text-xs text-gray-500">{connectedNumber}</span>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2">
          <div className="flex flex-col">
            <span className="max-w-[500px] truncate font-medium">_</span>
          </div>
        </div>
      )
    },
  },

  {
    id: "instanceQuota",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Instance Quota" />
    ),
    cell: ({ row }) => {
      const user = row.original.user
      let quota = user.rechargeType == "USER" ? user.quota : row.original.quota
      const unlimitedValidity = row.original.unlimitedValidity
      const quotaValidity = row.original.quotaValidity

      // check if validity is expired

      if (
        quotaValidity &&
        new Date(quotaValidity).getTime() < new Date().getTime()
      ) {
        quota = 0
      }

      return (
        <div className="flex flex-col">
          <span className="max-w-[500px] truncate font-medium"></span>
          <span className="max-w-[500px] truncate font-medium">
            {unlimitedValidity ? "Unlimited" : quota}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "quotaValidity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Validity" />
    ),
    cell: ({ row }) => {
      const user = row.original.user

      let quotaValidity = row.original.quotaValidity

      if (user.rechargeType == "USER") {
        quotaValidity = user.quotaValidity
      } else if (row.original.unlimitedValidity) {
        quotaValidity = row.original.unlimitedValidity
      } else {
        quotaValidity = row.original.quotaValidity
      }

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {quotaValidity ? formatDate(quotaValidity) : "N/A"}
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
            variant={row.getValue("isLoggedIn") ? "default" : "destructive"}
          >
            {capitalize(
              row.getValue("isLoggedIn") == true ? "Connected" : "Disconnected"
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
              row.getValue("webhookEnabled") == true ? "default" : "destructive"
            }
          >
            {row.getValue("webhookEnabled") == true ? "Enabled" : "Disabled"}
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
