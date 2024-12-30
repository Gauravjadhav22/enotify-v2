
import loading from "@/../public/illustrations/loading.svg"
import { getChildInstancesQuery } from "@/queries/instances"
import { useQuery } from "@tanstack/react-query"

import { CommonTable } from "@/components/table/table"

import { columns } from "./columns"


export function AdminResellerView() {
  const { data, isLoading } = useQuery({
    queryKey: ["instances"],
    queryFn: getChildInstancesQuery,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center flex-col items-center mt-16">
        {/* <Image src={loading} alt="Loading image" className="w-80 h-80" /> */}
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
          {/* <RenderMenuButton></RenderMenuButton> */}
          <h2 className="text-3xl font-bold tracking-tight">Instances</h2>
        </div>
        <CommonTable
          columns={columns}
          data={data?.data.instances || []}
        />
      </div>
    </>
  )
}
