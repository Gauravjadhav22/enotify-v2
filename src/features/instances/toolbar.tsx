"use client"

import { useMemo } from "react"
import {
  Cross2Icon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Instance } from "@/types/instances"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/table/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/table/data-table-view-options"

import { statuses } from "./data"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const getUsersOptions = useMemo(() => {
    const users = table
      .getCoreRowModel()
      .rows.map((row) => (row.original as Instance).user)

    const uniqueUsersId = new Set(users.map((user) => user.id))

    return Array.from(uniqueUsersId).map((id) => {
      const user = users.find((user) => user.id === id)
      return {
        value: id,
        label: user?.name || "",
      }
    })
  }, [table.getCoreRowModel().rows])

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search instances..."
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("isLoggedIn") && (
          <DataTableFacetedFilter
            column={table.getColumn("isLoggedIn")}
            title="Connection status"
            options={statuses}
          />
        )}

        {table.getColumn("webhookEnabled") && (
          <DataTableFacetedFilter
            column={table.getColumn("webhookEnabled")}
            title="Webhook status"
            options={statuses}
          />
        )}

        {table.getColumn("userId") && (
          <DataTableFacetedFilter
            column={table.getColumn("userId")}
            title="User"
            options={getUsersOptions}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
