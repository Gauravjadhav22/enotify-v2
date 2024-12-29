import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { DatePickerWithRange } from '@/components/date-picker'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterableColumns?: {
    id: keyof TData
    title: string
    options?: { label: string; value: string }[]
  }[]
  onExportData?: (rows: TData[]) => void // Standardized export function
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  onExportData,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleExport = () => {
    const allData = table.getCoreRowModel().rows.map((row) => row.original)
    if (onExportData) {
      onExportData(allData)
    } else {
      console.warn('Export function is not provided.')
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn('search')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('search')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <DatePickerWithRange />

        <div className="flex gap-x-2">
          {filterableColumns.map((column) => {
            const tableColumn = table.getColumn(column.id as string)
            return (
              tableColumn && (
                <DataTableFacetedFilter
                  key={column.id as string}
                  column={tableColumn}
                  title={column.title}
                  options={column.options ?? []}
                />
              )
            )
          })}
        </div>
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

      <Button onClick={handleExport} className="h-8 px-4 mr-2">
        Export All Data
      </Button>

      <DataTableViewOptions table={table} />
    </div>
  )
}
